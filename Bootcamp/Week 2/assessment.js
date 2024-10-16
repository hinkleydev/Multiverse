/* 
Azz Hinkley - Bootcamp - Week 2 - EOW project - 11/10/2024 - Cash register

Requirements list on MV
+ Add and remove items
+ Counts the amount of coins and bills in the drawer
+ Sum the total amount of money in the drawer
+ Determine whether it is possible to create a specific cash amount from the current items in the drawer
+ Computes the change required from a transaction and removes it from the drawer if possible

Surely all this would make more sense as methods? Ahh, whatever the brief says

*/

const drawer = [
    { name: 'penny', value: 1, quantity: 72 }, // 0
    { name: 'nickel', value: 5, quantity: 41 }, // 1
    { name: 'dime', value: 10, quantity: 31 }, // 2
    { name: 'quarter', value: 25, quantity: 17 }, // 3
    { name: 'one', value: 100, quantity: 90 }, // 4
    { name: 'five', value: 500, quantity: 11 }, // 5
    { name: 'ten', value: 1_000, quantity: 2 }, // 6
    { name: 'twenty', value: 2_000, quantity: 3 }, // 7
    { name: 'hundred', value: 10_000, quantity: 1 } // 8
]

/**
 * Add/remove a single item to the draw, takes a parameter 
 * of what to add and what drawer to add it to
 * 
 * - Item is the item that should be acted upon
 * - Drawer is the object to interact with
 * - Amount is the amount to take away or add, defined by functions
 *  
 * @param {String} item
 * @param {Array} drawer 
 * @param {Number} amount
 */
function changeItem(item, drawer, amount) {
  let tray = {}; // This will be the holding bay for the currency
  let drawerIndex = 0;
  do {
    tray = drawer[drawerIndex];
  }
  while(tray.name != item); 
  /* This could potentially cause an issue if someone handed 
  over a value which wasn't in the drawer, but since this is
  just a test environment, that's not a concern */ 
  tray.quantity += amount; // This is a reference, so it changes drawer as well
  // Applying a negative number can remove items as well
  return drawer;
}

/* These are bridges for the changeItem function, 
there's no need to write the same set of code twice */

function addItem(item, drawer) {
    return changeItem(item, drawer, 1);
}

function removeItem(item, drawer) {
    return changeItem(item, drawer, -1);
}

/**
 * Counting function, this function counts the specified items in the register.
 * What this will do is iterate through each item to look for, save it, and add them all together at the end
 * 
 * @param {Array} items What should be looked for
 * @param {Array} drawer Drawer to search
 */
function countItems(items, drawer) {
    let count = 0;
    for(each of items) {
        for(tray of drawer) {
            if (tray.name == each) { // If it's what we're looking for
                count += tray.quantity;
                break; // Continue to the next item to count
            }
        }
    }
    return count;
}

/* These are bridges for the countItems function,
there's no point having the same code written twice*/

function countNotes(drawer) {
    return countItems(["one", "five", "ten", "twenty", "hundred"], drawer);
}

function countCoins(drawer) {
    return countItems(["penny", "nickel", "dime", "quarter"], drawer);
}


/**
 * This function sums up the amount in the register
 * 
 * @param {Array} drawer Drawer array
 */
function sumDrawer(drawer) {
    let count = 0; // Total money integer
    for(tray of drawer) {
        count += (tray.quantity * tray.value) // Times together to get the value of everything
    }
    let cash = count / 100; // Convert to cash
    return ("$" + cash);
}

/**
 * This function calculates how to get certain amount of change.
 * By working backwards from the largest items, we should be able to check if a 
 * note can be handed over as change.
 * 
 * @param {Number} target The target amount to make in cents
 * @param {Array} drawer The drawer to take this money from
 */
function getChange(target, drawer) {
    // The drawer array is already in order of value, so that saves us sometime as we can just walk backwards
    // Make a copy, cause we're going to be alterating things that might end up being discarded
    let cache = drawer.slice();
    let item; // For readability
    for(let i = cache.length -1; i >= 0; i--) {
        item = cache[i];
        while (item.quantity > 0 && // No point checking if this note or coin isn't avaliable
               target >= item.value) { // Can't give change with a note worth more than the change
            target -= item.value; // Take away the value of the note/coin from the target
            item.quantity--; // Take away a note/coin from the register
        }
    }
    if (target > 0) throw "Unable to provide change";
    else return cache;
}

/**
 * This function works in a very similar way to `getChange`, you provide a number representing the
 * cash that was handed over, and it returns a new draw updated with the new cash.
 * @param {Number} cash
 * @param {Array} drawer 
 */
function addChange(cash, drawer) {
    // Much of this code is copied from the getChange function, unfortunately they can not be combined
    // without overcomplicating the function.
    let cache = drawer.slice();
    let item; // For readability
    for(let i = cache.length -1; i >= 0; i--) {
        item = cache[i];
        while (cash >= item.value) { // The cash amount needs to be worth than the notes/coins
            cash -= item.value; // Take away the value of the note/coin from the target
            item.quantity++; // Add a note/coin to the register
        }
    }
    return cache;
}

function canMakeAmount(target, drawer) {
    try {
        getChange(target, drawer);
        return true;
    } catch {
        return false; // It throws an error if it can't make the change
    }
}


/**
 * This calculates how much change should be given for a certain cost
 * 
 * @param {Number} cost How much the total came to
 * @param {Number} paid How much cash was paid
 * @param {Array} drawer The drawer that this should be acted upon
 */
function transaction(cost, paid, drawer) {
    let till;
    till = addChange(paid, drawer); // Add the money in first
    till = getChange(cost, drawer); // Take the cost away
    return till;
}
