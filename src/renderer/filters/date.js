import moment from 'moment';
moment.locale('fr');

export const dateFormated = date => moment(date).format('l');
export const dateRelative = date => moment(date).fromNow();