const Tour = require('../../../lib/Model/Tour.js');

describe('Tour mobel', ()=>{
    it('has title, activities, and a date', ()=>{
        return Tour 
            .create(
                { title:'first tour' },
                { activities: 'pole dancing' },
                { date : Date })
            .then(created => {
                expect(created).toEqual({
                  
                });
            });
    });
});
