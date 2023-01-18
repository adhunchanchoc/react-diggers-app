import React, { useState, useRef } from "react";

import { tasks, taskListCount } from "./tasksDb";

//netreba
import HomeDig, { totalManpowerAvailable } from "./index";

import {
  Task,
  PlanTasksButton,
  DiggerListWrap,
  DiggerInputs,
} from "./digStyles";

export default function HomeTasks() {
  // const [tasksList, setTasksList] = useState(Tasks);

  let totalManpowerRequired = 0;
  //   const totalManpowerRequired = function () {
  //     //kolik za hod vykopou vsichni pracovnici - pak nutno odecist jiz naplanovane
  //     let totalHours = 0;
  //     let totalMeters = 0;
  //     // console.log(listOfTasks.length);
  //     listOfTasks.forEach((task) => {
  //       totalMeters += parseFloat(task.meters);
  //       totalHours += parseFloat(task.timeLimit);
  //     });
  //     console.log(
  //       `Vyzadovana pracovni sila na je ${
  //         totalMeters / totalHours
  //       } metru za hodinu X Pracovnici dohromady za hod. zvladnou vykopat ${totalManpowerAvailable}`
  //     );
  //     return totalMeters / totalHours;
  //   };

  // FCE pridani ukolu
  const tasksCount = useRef(tasks.length);
  const [listOfTasks, setListOfTasks] = useState(tasks);
  //   const [enableAdd, setEnableAdd] = useState(disabled);

  //objekt addTask{}, ktery se pri zmene inputu postupne sestavuje, useState mu udeluje vychozi hodnoty jeho properties
  const [addTask, setAddTask] = useState({
    id: tasksCount.current + 1,
    name: "",
    meters: "",
    timeLimit: "",
    // sem metoda setAddTask doplni (pri pouziti spread) ci nahradi klic a hodnotu property {key:value,}
  });
  // pri zapisu inputu doplnuje do objektu addTask (spread operatorem ...addTask)
  const handleChange = (e) => {
    setAddTask({ ...addTask, [e.target.name]: e.target.value });
    // pro pridani/zmenu properties vyuziva elementu spoustejiciho udalost - event.target.vlastnost
  };

  const handleAdd = async (e) => {
    e.preventDefault(); // lze take vyuzit HMTL zpusob: onEvent="return false"
    let pushTask = false;

    let currentTaskRequirement = 0;
    let prevTasksRequirement = 0;
    let prevTotalHours = 0;
    let prevTotalMeters = 0;
    // console.log(listOfTasks.length);
    listOfTasks.forEach((task) => {
      prevTotalMeters += parseFloat(task.meters);
      prevTotalHours += parseFloat(task.timeLimit);
    });
    prevTasksRequirement = prevTotalMeters / prevTotalHours;

    currentTaskRequirement = addTask.meters / addTask.timeLimit;
    console.log(`Naroky pridaneho ukonu jsou ${currentTaskRequirement} m/hod`);
    totalManpowerRequired = prevTasksRequirement + currentTaskRequirement;

    if (addTask.meters > 0 && addTask.timeLimit > 0) {
      if (totalManpowerAvailable >= totalManpowerRequired) {
        await setListOfTasks((listOfTasks) => {
          return [...listOfTasks, addTask];
        });
        tasksCount.current++;

        console.log(
          `Naroky vsech ukonu jsou nyni ${currentTaskRequirement} m/hod`
        );
        await setAddTask({
          id: tasksCount.current + 1,
          name: "",
          meters: "",
          timeLimit: "",
        });
      } else {
        alert("Nelze pridat dalsi ukol (malo pracovniku)");
      }
    } else {
      alert("Vyplnit metry a casovy limit ukolu");
    }
  };
  // odstraneni pracovnika
  const handleDelete = (id) => {
    setListOfTasks(listOfTasks.filter((task) => task.id !== id));
  };

  /////////////RETURN //////////////////
  return (
    <>
      <h1>UKOLY</h1>

      {/* smycka vypisujici ukoly */}
      {/* {tasks.map((task) => (
                <Person key={task.id}>
                  {task.name} vykope {task.timeLimit} metru za hodinu
                </Person>
              ))} */}
      {/* ///////////////////////////// */}
      <DiggerListWrap name="taskList">
        {listOfTasks.map((task) => (
          <Task key={task.id} name={task.name}>
            {task.name} {" - "}
            {task.meters} {" metru - limit "}
            {task.timeLimit} {" hod"}
            <button
              onClick={() => {
                handleDelete(task.id);
              }}
            >
              X
            </button>
          </Task>
        ))}
      </DiggerListWrap>
      {/* VSTUP */}

      <DiggerInputs name="diggerForm">
        <input
          type="text"
          placeholder="Oznaceni ukolu"
          className="inputClass"
          name="name"
          value={addTask.name}
          onChange={handleChange}
        />
        {/* <label htmlFor="meters">Metru</label> */}
        <input
          type="number"
          placeholder="metry"
          className="inputClass"
          name="meters"
          id="meters"
          value={addTask.meters}
          onChange={handleChange}
          required
        />
        {/* <label htmlFor="timeLimit">Max hodin</label> */}
        <input
          type="number"
          placeholder="hod"
          min="1"
          //   max="999"
          //   step="1"
          className="inputClass"
          name="timeLimit"
          id="timeLimit"
          value={addTask.timeLimit}
          onChange={handleChange}
          required
        />
        <PlanTasksButton className="inputClass" onClick={handleAdd}>
          Pridat
        </PlanTasksButton>
      </DiggerInputs>
      <br />
      {/* <PlanTasksButton className="inputClass" onClick={handleAdd}>
          Naplanovat vse
        </PlanTasksButton> */}
    </>
  );
}
