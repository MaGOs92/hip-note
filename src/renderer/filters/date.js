import moment from 'moment';
moment.locale('fr');

export const dateFormated = date => moment(date).format('L');
export const dateRelative = date => moment(date).fromNow();