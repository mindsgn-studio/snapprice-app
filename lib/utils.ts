import * as BackgroundTask from 'expo-background-task';
import * as TaskManager from 'expo-task-manager';
import { items } from '../schema';
import * as SQLite from "expo-sqlite";

const DATABASE_NAME = 'snapprice';
const BACKGROUND_TASK_IDENTIFIER = 'background-task';

const db = SQLite.openDatabaseSync(DATABASE_NAME);

TaskManager.defineTask(BACKGROUND_TASK_IDENTIFIER, async () => {
  try {
    const items = db.getAllSync("SELECT * FROM items;");
    
    items.map((item: any) => {
      console.log(item);
    });
    
    return BackgroundTask.BackgroundTaskResult.Success; 
  } catch (error) {
    console.error('Failed to execute background task:', error);
    return BackgroundTask.BackgroundTaskResult.Failed;
  }
});

export const startBackgroundTask = async () => {
  try {
    await BackgroundTask.registerTaskAsync(BACKGROUND_TASK_IDENTIFIER, );
    console.log("Background task registered!");
  } catch (error) {
    console.log("Failed to register background task:", error);
  }
};

export const stopBackgroundTask = async () => {
  try {
    await BackgroundTask.unregisterTaskAsync(BACKGROUND_TASK_IDENTIFIER);
    console.log("Background task unregistered!");
  } catch (error) {
    console.log("Failed to unregister background task:", error);
  }
};

export { BACKGROUND_TASK_IDENTIFIER };