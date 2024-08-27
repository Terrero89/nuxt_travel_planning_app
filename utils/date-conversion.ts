const arrival = "10:55 AM";
const leaving = "9:57 PM";
const totalTime = calculateTimeDifference(arrival, leaving);
  export function parseTime(timeStr:any) {
    const [time, modifier] = timeStr.split(' '); // Split time and AM/PM
    let [hours, minutes] = time.split(':').map(Number);
  
    if (modifier === 'PM' && hours !== 12) {
      hours += 12;
    } else if (modifier === 'AM' && hours === 12) {
      hours = 0;
    }
  
    return { hours, minutes };
  }
  
  export function calculateTimeDifference(arrivalTime: string, leavingTime: string) {
    const arrival = parseTime(arrivalTime);
    const leaving = parseTime(leavingTime);
  
    // Create Date objects for both times on the same day
    const arrivalDate: any = new Date(2024, 0, 1, arrival.hours, arrival.minutes);
    const leavingDate : any = new Date(2024, 0, 1, leaving.hours, leaving.minutes);
  
    // Calculate the difference in milliseconds
    const differenceInMillis = leavingDate - arrivalDate;
  
    // Convert milliseconds to hours and minutes
    const differenceInHours = Math.floor(differenceInMillis / (1000 * 60 * 60));
    const differenceInMinutes = Math.floor((differenceInMillis % (1000 * 60 * 60)) / (1000 * 60));
  
    return `${differenceInHours}.${differenceInMinutes} hours`;
  }





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
  const targetDate = "2025-02-28"; // Example: Christmas Day
  const daysRemaining = calculateDaysRemaining(targetDate);