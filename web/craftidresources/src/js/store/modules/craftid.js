import * as types from '../mutation-types'
import Vue from 'vue'
import Vuex from 'vuex'
import craftIdApi from '../../api/craftid';

Vue.use(Vuex)

/**
 * State
 */
const state = {
    categories: [],
    countries: [],
    renewLicensesTotal: 0,
}

/**
 * Getters
 */
const getters = {

    countries(state) {
        return state.countries;
    },

}

/**
 * Actions
 */
const actions = {

    getCraftIdData({commit}) {
        return new Promise((resolve, reject) => {
            craftIdApi.getCraftIdData(response => {
                    commit(types.RECEIVE_CRAFT_ID_DATA, {response});
                    commit(types.RECEIVE_CATEGORIES, {categories: response.data.categories});
                    commit(types.RECEIVE_COUNTRIES, {countries: response.data.countries});

                    commit(types.RECEIVE_PLUGINS, {plugins: response.data.plugins});
                    commit(types.RECEIVE_UPCOMING_INVOICE, {upcomingInvoice: response.data.upcomingInvoice});
                    commit(types.RECEIVE_SALES, {sales: response.data.sales});
                    commit(types.RECEIVE_CMS_LICENSES, {cmsLicenses: response.data.cmsLicenses});
                    commit(types.RECEIVE_PLUGIN_LICENSES, {pluginLicenses: response.data.pluginLicenses});
                    commit(types.RECEIVE_HAS_API_TOKEN, {hasApiToken: response.data.currentUser.hasApiToken});
                    commit(types.RECEIVE_APPS, {apps: response.data.apps});
                    commit(types.RECEIVE_CURRENT_USER, {currentUser: response.data.currentUser});
                    commit(types.RECEIVE_BILLING_ADDRESS, {billingAddress: response.data.billingAddress});
                    resolve(response);
                },
                response => {
                    reject(response);
                })
        })
    },

}

/**
 * Mutations
 */
const mutations = {

    [types.RECEIVE_CRAFT_ID_DATA](state, {response}) {
        state.renewLicensesTotal = response.data.renewLicensesTotal
    },

    [types.RECEIVE_CATEGORIES](state, {categories}) {
        state.categories = categories;
    },

    [types.RECEIVE_COUNTRIES](state, {countries}) {
        state.countries = countries;
    },

}

export default {
    state,
    getters,
    actions,
    mutations
}
