import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase';
import { auth, goalsCollection, usersCollection } from "@/firebaseConfig";
import { Goal } from '@/models/Goal';
import { User } from '@/models/User';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {} as User,
    goals: [] as Goal[],
  },
  getters: {
    numberOfGoals: state => {
      return state.goals.length;
    },
    totalGoalDuration: state => {
      return Object.values(state.goals).reduce((accumulator, { duration }) => {
        return accumulator + duration;
      }, 0)
    },
    achievedGoalsPercentage: (state, getters) => {
      let numberOfAchievedGoals = 0;
      state.goals.forEach(goal => {
        if (goal.achieved)
          numberOfAchievedGoals++;
      })
      if (getters.numberOfGoals == 0) return "-"
      return Math.round(numberOfAchievedGoals / getters.numberOfGoals * 100);
    }
  },
  mutations: {
    setGoals(state, goals: Goal[]) {
      state.goals = goals;
    },
    setLoggedInUser(state, user: User) {
      state.user = user;
    }
  },
  actions: {
    async getGoals({ commit }) {
      try {
        goalsCollection.where("uid", "==", this.state.user.uid).orderBy("date").onSnapshot(querySnapshot => {
          const goals = [] as any;

          querySnapshot.forEach(doc => {
            const goal = {
              id: doc.id,
              ...doc.data()
            };
            goals.push(goal);
          });
          commit("setGoals", goals);
        });
        console.log("Mål hämtade.");
      } catch (error) {
        console.error("Kunde inte hämta mål: ", error);
      }
    },
    async signIn({ commit, dispatch }) {
      try {
        const provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
        const response = await auth.signInWithPopup(provider);
        console.log("Användaren loggades in.", response.user);
        commit("setLoggedInUser", response.user);
        const doc = await usersCollection.doc(response.user?.uid).get();
        if (doc.exists)
          console.log("Användaren finns redan i databasen.")
        else
          dispatch("createUser", response.user);
      } catch (error) {
        console.error("Kunde inte skapa användare: ", error);
      }
    },
    async createUser(context, user: User) {
      try {
        await usersCollection.doc(user.uid).set({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName
        })
        console.log("Avnändare tillagd i databasen.")
      } catch (error) {
        console.error("Kunde inte lägga till användren i databasen: ", error);
      }
    },
    async logoutUser() {
      try {
        await auth.signOut();
        console.log("Användaren loggades ut.");
      } catch (error) {
        console.error("Användaren kunde inte loggas ut: ", error);
      }
    },
    async createGoal(context, goal: Goal) {
      try {
        await goalsCollection.add(goal);
        console.log("Mål skapat.");
      } catch (error) {
        console.error("Kunde inte skapa mål: ", error);
      }
    },
    async toggleAchieved(context, goal: Goal) {
      try {
        await goalsCollection.doc(goal.id).update({ achieved: !goal.achieved });
        console.log("Uppnått togglad.")
      } catch (error) {
        console.error("Kunde inte uppdatera dokumentet: ", error);
      }
    },
    async deleteGoal(context, goal: Goal) {
      try {
        await goalsCollection.doc(goal.id).delete();
        console.log("Mål borttaget");
      } catch (error) {
        console.error("Kunde inte ta bort dokumentet: ", error);
      }
    }
  },
  modules: {
  }
})
