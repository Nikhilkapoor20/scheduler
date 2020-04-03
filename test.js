const chai = require('chai')
const expect = chai.expect
const myModule = require('./index');

describe('Scheduler', () => {

    it('Should return empty array if dependency and tasks are empty', () => {
        const tasks = [];
        const dependencies = [];
        const result = myModule.schedulingSystem(tasks, dependencies);
        expect(result).to.eql([]);
    });

    it('Should return task array if dependency is empty', () => {
        const tasks = ['a', 'b'];
        const dependencies = [];
        const result = myModule.schedulingSystem(tasks, dependencies);
        expect(result).to.eql(['a', 'b']);
    });

    it('Should list the dependency', () => {
        const tasks = ['a', 'b'];
        const dependencies = ['a => b'];
        const result = myModule.schedulingSystem(tasks, dependencies);
        expect(result).to.eql(['b', 'a']);
    });

    it('Should list the dependency', () => {
        const tasks = ['a', 'b', 'c', 'd'];
        const dependencies = ['a => b', 'c => d'];
        const result = myModule.schedulingSystem(tasks, dependencies);
        expect(result).to.eql(['b', 'a', 'd', 'c']);
    });

    it('Should check for further dependency', () => {
        const tasks = ['a', 'b', 'c'];
        const dependencies = ['a => b', 'b => c'];
        const result = myModule.schedulingSystem(tasks, dependencies);
        expect(result).to.eql(['c', 'b', 'a']);
    });


    it('Should throw an error in case of cyclic dependency', () => {
        const tasks = ['a', 'b', 'c', 'd'];
        const dependencies = ['a => b', 'b => c', 'c=>d', 'd=>a'];
        expect(myModule.schedulingSystem.bind(this, tasks, dependencies)).to.throw('this is a cyclic dependency');
    });

    it('Should have valid input value', () => {
        expect(myModule.schedulingSystem.bind(this, null, null)).to.throw('Invalid inputs');
    });
});
