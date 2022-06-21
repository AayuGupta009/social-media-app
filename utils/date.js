const weekdays = {
    0: 'sunday',
    1: 'monday',
    2: 'tuesday',
    3: 'wednesday',
    4: 'thursday',
    5: 'friday',
    6: 'saturday'
};

const getWeekdayByNumber = (i) => weekdays[i];


module.exports = {
    getWeekdayByNumber,
    weekdays
};
