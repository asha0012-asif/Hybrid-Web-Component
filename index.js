function displayCurrentTime(date) {
    return date.toLocaleTimeString();
}

const today = new Date();
console.log(displayCurrentTime(today));
