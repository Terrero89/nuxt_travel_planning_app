const arrival = "10:55 AM";
const leaving = "9:57 PM";
const totalTime = calculateTimeDifference(arrival, leaving);
export function parseTime(timeStr: any) {
    const [time, modifier] = timeStr.split(' '); // Split time and AM/PM
    let [hours, minutes] = time.split(':').map(Number);

    if (modifier === 'PM' && hours !== 12) {
        hours += 12;
    } else if (modifier === 'AM' && hours === 12) {
        hours = 0;
    }

    return { hours, minutes };
}

/*
calculate the time differencee between two input hours
* it  receives two parameters of Date type arrivalTime and leavingTime
* will use the parseTime function to return the hours and minutes in the correct format.
* returns the time difference in hours 
*/

export function calculateTimeDifference(arrivalTime:string, leavingTime:string) {
    const arrival = parseTime(arrivalTime);
    const leaving = parseTime(leavingTime);

    // Create Date objects for both times on the same day
    const arrivalDate: any = new Date(2024, 0, 1, arrival.hours, arrival.minutes);
    const leavingDate: any = new Date(2024, 0, 1, leaving.hours, leaving.minutes);

    // Calculate the difference in milliseconds
    const differenceInMillis = leavingDate - arrivalDate;

    // Convert milliseconds to hours and minutes
    const differenceInHours = Math.floor(differenceInMillis / (1000 * 60 * 60));
    const differenceInMinutes = Math.floor((differenceInMillis % (1000 * 60 * 60)) / (1000 * 60));

    return `${differenceInHours}.${differenceInMinutes} hours`;
}
/*
function that calculates how many days are remaining for specified date
* receives a targetDate paramater of Date type
* returns a number with remaining days
 */
export function calculateDaysRemaining(targetDateStr: any) {
    // Parse the target date (format: "YYYY-MM-DD")
    const targetDate: any = new Date(targetDateStr);

    // Get the current date
    const currentDate: any = new Date();

    // Set the time of the current date to midnight to get an accurate day count
    currentDate.setHours(0, 0, 0, 0);

    // Calculate the difference in milliseconds
    const differenceInMillis = targetDate - currentDate;

    // Convert milliseconds to days (1000 ms/s * 60 s/min * 60 min/h * 24 h/day)
    const remainingDays = Math.ceil(differenceInMillis / (1000 * 60 * 60 * 24));

    return remainingDays;
}

// Example usage:
// const targetDate = "2025-02-28"; // Example: Christmas Day
// const daysRemaining = calculateDaysRemaining(targetDate);

/*
function that returns the number of days that have passed since arrival date to leaving date
 * receives two parameters of Date type
* returns a number type result
*/
export function calculateDaysRangeDuration(arrivalDate: string, leavingDate: string): number {
    // Parse the arrival and leaving dates
    const arrival = new Date(arrivalDate);
    const leaving = new Date(leavingDate);

    const differenceInMillis = leaving.getTime() - arrival.getTime();
    const differenceInDays = differenceInMillis / (1000 * 60 * 60 * 24);
    return Math.ceil(differenceInDays);
}
/*
function that evaluates the time that has passed since specific date.
* it receives a specified date of date type
*/
export function timeSince(date: Date): string {
    const now = new Date();
    const differenceInMillis = now.getTime() - date.getTime();

    const msPerMinute = 60 * 1000;
    const msPerHour = msPerMinute * 60;
    const msPerDay = msPerHour * 24;
    const msPerWeek = msPerDay * 7;
    const msPerMonth = msPerDay * 30; // Approximation
    const msPerYear = msPerDay * 365; // Approximation

    if (differenceInMillis < msPerDay) {
        return "less than a day ago";
    } else if (differenceInMillis < msPerWeek) {
        const days = Math.floor(differenceInMillis / msPerDay);
        return days === 1 ? `${days} day ago` : `${days} days ago`;
    } else if (differenceInMillis < msPerMonth) {
        const weeks = Math.floor(differenceInMillis / msPerWeek);
        return weeks === 1 ? `${weeks} week ago` : `${weeks} weeks ago`;
    } else if (differenceInMillis < msPerYear) {
        const months = Math.floor(differenceInMillis / msPerMonth);
        return months === 1 ? `${months} month ago` : `${months} months ago`;
    } else {
        const years = Math.floor(differenceInMillis / msPerYear);
        return years === 1 ? `${years} year ago` : `${years} years ago`;
    }
}

/*
function that checks if a date is greater than another. 
* receives two parameters of a Date type 
* returns a boolean
*/

export function isDateGreater(date1: Date, date2: Date): boolean {
    return date1.getTime() > date2.getTime();
}

/*
function that transform data input  2024-02-28 when receiving a new Date()
*/

export function formatDate(date: { getFullYear: () => any; getMonth: () => number; getDate: () => any; }) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based, so add 1
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function formatNumber(number: number) {
  return new Intl.NumberFormat('en-US').format(number);
}


// export function calculateDuration(startTime: any, endTime:any) {
//     // Parse the start and end times
//     const [startHours, startMinutes] = startTime.split(':').map(Number);
//     const [endHours, endMinutes] = endTime.split(':').map(Number);
  
//     // Calculate the total minutes for start and end times
//     const startTotalMinutes = startHours * 60 + startMinutes;
//     const endTotalMinutes = endHours * 60 + endMinutes;
  
//     // Calculate the difference in minutes
//     let diffMinutes = endTotalMinutes - startTotalMinutes;
  
//     // If the difference is negative, it means the end time is on the next day
//     if (diffMinutes < 0) {
//       diffMinutes += 24 * 60;
//     }
  
//     // Calculate the duration hours and minutes
//     const durationHours = Math.floor(diffMinutes / 60);
//     const durationMinutes = diffMinutes % 60;
  
//     // Convert the duration to 12-hour format with AM/PM
//     const durationPeriod = durationHours >= 12 ? 'PM' : 'AM';
//     const formattedHours = ((durationHours % 12) || 12); // Convert 0 to 12 for 12-hour format
  
//     return `${formattedHours}:${durationMinutes.toString().padStart(2, '0')} ${durationPeriod}`;
//   }

  // Example usage:
// const startTime = '14:35';
// const endTime = '15:47';
// const duration = calculateDuration(startTime, endTime);
// console.log(duration); // Output: "1:12 PM"

export function calculateTotalDuration(startTime:any, endTime:any) {
    if (!startTime || !endTime) {
      return "Invalid time input"; // Handle cases where input times are missing
    }
  
    // Parse the start and end times
    const [startHours, startMinutes] = startTime.split(':').map(Number);
    const [endHours, endMinutes] = endTime.split(':').map(Number);
  
    // Ensure parsed times are valid numbers
    if (isNaN(startHours) || isNaN(startMinutes) || isNaN(endHours) || isNaN(endMinutes)) {
      return "Invalid time format"; // Handle invalid time formats
    }
  
    // Calculate the total minutes for start and end times
    const startTotalMinutes = startHours * 60 + startMinutes;
    const endTotalMinutes = endHours * 60 + endMinutes;
  
    // Calculate the difference in minutes
    let diffMinutes = endTotalMinutes - startTotalMinutes;
  
    // If the difference is negative, it means the end time is on the next day
    if (diffMinutes < 0) {
      diffMinutes += 24 * 60;
    }
  
    // Calculate the duration hours and minutes
    const durationHours = Math.floor(diffMinutes / 60);
    const durationMinutes = diffMinutes % 60;
  
    // Return hours if more than 1 hour, else return minutes
    if (durationHours >= 1) {
      return `${durationHours} hours`;
    } else {
      return `${durationMinutes} minutes`;
    }
  }
  
  // Example usage:
//   const startTime = '14:35';
//   const endTime = '15:47';
//   const duration = calculateTotalDuration(startTime, endTime);
//   console.log(duration); // Output: "1:12 hours"