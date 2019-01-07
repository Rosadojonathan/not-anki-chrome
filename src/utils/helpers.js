import React from 'react'

const NOTIFICATION_KEY = 'flashcards: notifications'

const DAY_IN_MINISECONDS = 24 * 60 * 60 * 1000;
const getDaysSinceEpoch = () => (
    Math.round(new Date().getTime() / DAY_IN_MINISECONDS)
);
export const TODAY = getDaysSinceEpoch();


export const getCardsLength = (vocab) => {
	if(vocab.length === 0) {
		return <p>0 cards</p>
	}else if (vocab.length > 1) {
		return <p>{vocab.length} cards</p>
	}else {
		return <p>1 card</p>
	} 
}

export const getCardsToReview = (vocab) => {
	let toReview = 0;
	vocab.forEach(word => {
		if (word.dueDate <= TODAY){
			toReview += 1;
		}
	})
	if(toReview === 0) {
		return <p>0 cards</p>
	}else if (toReview > 1) {
		return <p>{toReview} cards</p>
	}else {
		return <p>1 card</p>
	} 
}

export const displayLearningSessionButton = (vocab) => {
	let toReview = 0;
	vocab.forEach(word => {
		if (word.dueDate <= TODAY){
			toReview += 1;
		}
	})
	if(toReview === 0) {
		return false
	}else if (toReview >= 1) {
		return true
	}
}

function createNotification () {
	return {
		title: 'Study study study',
		body: '👋 do not forget to study today!',
		ios: {
			sound: true
		}
	}
}


