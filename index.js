/**
 * @param  {string[]} task
 * @param  {string[]} dependencies
 * @description
 * As part of a scheduling system, we need to be able to determine the order to execute dependent
 * tasks after parsing their definitions.
 * Tasks are identified by a lowercase word. Dependencies between tasks are denoted using a => b
 * where a is a task that is dependent on b.
 * When a task has a dependency on one or more other tasks, those tasks must be executed first. If a
 * task has no dependencies it is executed in the order that it has been declared. If a cyclic dependency
 * is used, the system must detect it as an error and not enter an invalid state.
 * We estimate that there will never be more than 50 tasks at a time.
 */
function schedulingSystem(tasks, dependencies) {
    if (tasks && dependencies) {
        if (tasks.length && dependencies.length === 0) { // task is given but no dependencies
            return tasks;
        } else if (tasks.length && dependencies.length) { // task and dependencies both are given
            return getDependencies(tasks, dependencies);
        }
        return []; // if no condition satisfies return empty array
    } else {
        throw 'Invalid inputs';
    }
}

/**
 * @name getDependencies
 * @param  {string[]} tasks
 * @param  {string[]} dependencies
 * @returns {string[]}
 * @description this function will check the dependency
 */
function getDependencies(tasks, dependencies) {
    const result = [];
    tasks.forEach(task => {
        for (let index = dependencies.length - 1; index >= 0; index--) {
            const components = getComponents(dependencies[index]);
            if (result.indexOf(components.dependentOn) > 0 ||
                result.indexOf(components.dependent) > 0) {
                throw 'Error - this is a cyclic dependency';
            } else if (task === components.dependentOn) {
                const moreDependency = isFurtherDependent(components.dependentOn, dependencies);
                if (moreDependency) {
                    result.push(moreDependency.components.dependentOn);
                    dependencies.splice(moreDependency.index, 1);
                }
                result.push(components.dependentOn);
                result.push(components.dependent);
                dependencies.splice(index, 1);
            }
        }
    });
    return result;
}

/**
 * @name isFurtherDependent
 * @param  {string} dependentOn
 * @param  {string} dependencies
 * @returns {components, index}
 * @description This function will check wether the selected
 * dependency will have dependency on others as well
 */
function isFurtherDependent(dependentOn, dependencies) {
    for (let index = 0; index < dependencies.length; index++) {
        const components = getComponents(dependencies[index]);
        if (components.dependent === dependentOn) {
            return { components, index };
        }
    }
}

/**
 * @name getComponents
 * @param  {string} dependency
 * @returns {dependent, dependentOn}
 * @deprecated This function will separate out the values from dependency
 * @example
 * a => b
 * where a is dependent and b is dependentOn
 */
function getComponents(dependency) {
    const dependent = dependency.trim().substring(1, 0);
    const dependentOn = dependency.trim().substring(dependency.indexOf('>') + 1).trim();
    return { dependent, dependentOn };
}


module.exports = {
    schedulingSystem: schedulingSystem
}