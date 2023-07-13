import * as dotenv from 'dotenv'
import * as process from 'process'
dotenv.config()

export const firebaseConfig = {
	apiKey: process.env.API_KEY,
	authDomain: process.env.AUTH_DOMAIN,
	projectId: process.env.PROJECT_ID,
	storageBucket: process.env.STORAGE_BUCKET,
	messagingSenderId: process.env.MESSAGING_SENDER_ID,
	appId: process.env.APP_ID,
	measurementId: process.env.MEASUREMENT_ID,
	databaseURL:
		'https://foodexpressify-default-rtdb.europe-west1.firebasedatabase.app'
}
