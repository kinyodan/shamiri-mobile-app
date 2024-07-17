import axios from 'axios'
import { EXPO_PUBLIC_API_URL } from '@env';

export default {
    async getJournals(accessToken){
        const response = await axios.get(`${EXPO_PUBLIC_API_URL}/list_journals`, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return response.data.data ? response.data.data : false
    },

    async getJournalsByCategory(accessToken){
        const response = await axios.get(`${EXPO_PUBLIC_API_URL}/journals/grouped`, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return response.data.data ? response.data.data : false

    },

    async getJournalsFIlteredByDaily(accessToken){
        const response = await axios.get(`${EXPO_PUBLIC_API_URL}/journals/daily`, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return response.data.data ? response.data.data : false
    },

    async getJournalsFIlteredByWeekly(accessToken){
        const response = await axios.get(`${EXPO_PUBLIC_API_URL}/journals/weekly`, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return response.data.data ? response.data.data : false
    },

    async getJournalsFIlteredByMonthly(accessToken){
        const response = await axios.get(`${EXPO_PUBLIC_API_URL}/journals/monthly`, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return response.data.data ? response.data.data : false
    }

}