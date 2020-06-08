import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase';
import moment from 'moment';
import { auth, goalsCollection, annualGoalsCollection, usersCollection } from "@/firebaseConfig";

Vue.use(Vuex)

export interface Goal {
  id: string;
  achieved: boolean;
  duration: number;
  intensity: number;
  type: string;
  uid: string;
  week: number;
  fullDate: Date;
  date: number;
  month: number;
  year: number;
}

export interface User {
  email: string;
  uid: string;
  displayName: string;
}

export interface Calendar {
  year: number;
  month: number;
  date: number;
  week: number;
  fullDate: Date;
}

export default new Vuex.Store({
  state: {
    user: {} as User,
    goals: [] as Goal[],
    annualGoals: [] as Goal[],
    calendar: {} as Calendar,
    year: 0
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
    setAnnualGoals(state, goals: Goal[]) {
      state.annualGoals = goals;
    },
    setLoggedInUser(state, user: User) {
      state.user = user;
    },
    setCalendar(state, date) {
      const newDate: Calendar = {
        fullDate: moment(date).toDate(),
        date: moment(date).date(),
        week: moment(date).week(),
        month: moment(date).month(),
        year: moment(date).year()
      }
      state.calendar = { ...newDate };
    },
    setYear(state, year) {
      state.year = year;
    }
  },
  actions: {
    async initGoalsListener() {
      try {
        goalsCollection.where("uid", "==", this.state.user.uid).onSnapshot(() => {
          console.log("Lyssnaren efter mål vaknade.");
          this.dispatch("getGoals");
        });
      } catch (error) {
        console.error("Kunde inte lyssna efter mål: ", error);
      }
    },
    async initAnnualGoalsListener() {
      try {
        annualGoalsCollection.where("uid", "==", this.state.user.uid).onSnapshot(() => {
          console.log("Lyssnaren efter årliga mål vaknade.");
          this.dispatch("getAnnualGoals");
        });
      } catch (error) {
        console.error("Kunde inte lyssna efter årliga mål: ", error);
      }
    },
    async getGoals({ commit, state }) {
      try {
        const response = await goalsCollection.where("uid", "==", state.user.uid)
          .where("week", "==", state.calendar.week).where("year", "==", state.calendar.year).get();

        const goals = [] as any;
        response.forEach(doc => {
          const goal = {
            id: doc.id,
            ...doc.data()
          }
          goals.push(goal);
        })
        console.log("Mål hämtade: ", goals);
        commit("setGoals", goals);
      } catch (error) {
        console.error("Kunde inte hämta mål: ", error);
      }
    },
    async getAnnualGoals({ commit, state }) {
      try {
        const response = await annualGoalsCollection.where("uid", "==", state.user.uid)
          .where("year", "==", state.year).get();

        const goals = [] as any;
        response.forEach(doc => {
          const goal = {
            id: doc.id,
            ...doc.data()
          }
          goals.push(goal);
        })
        console.log("Årliga mål hämtade: ", goals);
        commit("setAnnualGoals", goals);
      } catch (error) {
        console.error("Kunde inte hämta årliga mål: ", error);
      }
    },
    async signIn({ commit, dispatch }) {
      try {
        const provider = new firebase.auth.GoogleAuthProvider();
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
    async createAnnualGoal(context, goal: Goal) {
      try {
        await annualGoalsCollection.add(goal);
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
        console.error("Kunde inte ta bort målet: ", error);
      }
    },
    async deleteAnnualGoal(context, goal: Goal) {
      try {
        await annualGoalsCollection.doc(goal.id).delete();
        console.log("Årligt mål borttaget");

      } catch (error) {
        console.error("Kunde inte ta bort årligt mål: ", error);
      }
    },
    setCalendar({ commit }, date) {
      commit("setCalendar", date);
      this.dispatch("getGoals");
    },
    setYear({ commit }, year) {
      commit("setYear", year);
      this.dispatch("getAnnualGoals");
    },
    previousWeek() {
      const date = moment(this.state.calendar.fullDate).subtract(7, "days").toDate();
      this.dispatch("setCalendar", date);
    },
    previousYear() {
      const year = this.state.year - 1;
      this.dispatch("setYear", year);
    },
    nextWeek() {
      const date = moment(this.state.calendar.fullDate).add(7, "days").toDate();
      this.dispatch("setCalendar", date);
    },
    nextYear() {
      const year = this.state.year + 1;
      this.dispatch("setYear", year);
    },
  },
  modules: {
  }
})
