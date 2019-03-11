import moment from 'moment';
import * as firebase from 'firebase';
import 'firebase/firestore';
import { parseDate, dateDiff } from './DateUtil';

// retrieves all the tasks from the database and returns them
// this function is asynchronous so it doesn't lock up the UI thread
export async function getTasks() {
    tasks = [];
    await firebase.firestore().collection('tasks').get()
      .then(querySnapshot => {
        querySnapshot.docs.forEach(doc => {
          tasks.push(doc.data());
      });
    });
    return tasks;
}

export function storeNewTask(title, priority, duration, dueDate, thenDo) {
    db = firebase.firestore()
    db.collection('tasks').get().then(snap => {
        size = snap.size // will return the amount of tasks we already stored...
        taskId = size + 1 // ... so that we can assign a new ID 
        
        db.collection("tasks").doc("task" + taskId).set({
            title: title,
            priority: priority,
            duration: duration,
            dueDate: dueDate,
            id: taskId
        }).then(() => {
            thenDo()
        })
    });
}

export function markTaskComplete(id) {
    db = firebase.firestore()
    db.collection("tasks").doc(id).update({
        complete: true
    })
}

export function calculatePriorityScore(task) {
    // first, let's store some values
    rawPriority = task.priority;
    rawDuration = task.duration;
    dueDateString = task.dueDate;
    dueDate = parseDate(dueDateString);
    today = parseDate(new Date())

    // now we calculate the proximity to the deadline in days
    daysUntil = dateDiff(today, dueDate);

    // now we convert rawPriority to an integer value
    priority = 0
    if(rawPriority === "low") priority = 1
    else if(rawPriority === "normal") priority = 2
    else if(rawPriority === "high") priority = 3
    else priority = 4

    // now we convert duration to an integer value
    duration = 0
    if(rawDuration === "low") duration = 1
    else if(rawDuration === "normal") duration = 2
    else if(rawDuration === "high") duration = 3
    else duration = 4
    
    // between 0 and 4
    // 0-1: very low, 1-2: low, 2-3: normal, 3-4: high
    priorityScore = ( (duration * 0.4 * priority * 0.6) / (daysUntil) );
    return priorityScore;
}
