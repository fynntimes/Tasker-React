import moment from 'moment';
import * as firebase from 'firebase';
import 'firebase/firestore';

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
