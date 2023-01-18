import React, { useState, useRef, useEffect } from "react";

import HomeTasks, { logTotalManpower } from "./tasksTabComp";

//nacteni dat o osobach
import { diggers } from "./diggersDb";

// importuji vlasni elementy z pomocneho stylovani (vyzadujici npm i styled-components)
import {
  MainContainer,
  DiggersTab,
  Person,
  TasksTab,
  Task,
  PlanTasksButton,
  TabNames,
  TabButton,
  DiggerListWrap,
  DiggerInputs,
} from "./digStyles";

export let totalManpowerAvailable = 0;
//rendering hlavni a jedine stranky
export default function HomeDig() {
  useEffect(() => {
    calculateTotalManpowerAvailable();
  });

  const calculateTotalManpowerAvailable = function () {
    let totalManpower = 0;
    listOfDiggers.forEach((digger) => {
      totalManpower += parseFloat(digger.metersPerHour);
    });
    console.log(
      `Pracovnici dohromady za hod. zvladnou vykopat ${totalManpower} metry`
    );
    totalManpowerAvailable = totalManpower;
    return totalManpower;
  };
  //deklarace promennych, setteru a sledovani useState dat pro trigger prerenderovani

  //SLEDOVANI TAB
  const [activeTab, setActiveTab] = useState("diggers-tab");

  // FCE PREPINAJICI TAB
  const switchTab = (e, newValue) => {
    e.preventDefault();
    const newActiveTab = newValue;
    setActiveTab(newActiveTab);
  };

  // const [diggersList, setDiggersList] = useState(Diggers);

  // FCE pridani pracovnika
  const diggersCount = useRef(diggers.length);

  const [listOfDiggers, setListOfDiggers] = useState(diggers);

  const [addDigger, setAddDigger] = useState({
    id: diggersCount.current + 1,
    name: "",
    gender: "",
    metersPerHour: 1,
  });
  const handleChange = (e) => {
    setAddDigger({ ...addDigger, [e.target.name]: e.target.value });
  };
  const handleAdd = async (e) => {
    e.preventDefault();
    let pushDigger = false;

    if (
      addDigger.name != ""
      //  podminka pridani kopace
    ) {
      pushDigger = true;
    }

    if (pushDigger) {
      await setListOfDiggers((listOfDiggers) => {
        return [...listOfDiggers, addDigger];
      });
      diggersCount.current++;
      await setAddDigger({
        id: diggersCount.current + 1,
        name: "",
        gender: "",
        metersPerHour: addDigger.gender == "f" ? 0.5 : 1,
      });
    } else {
      alert("Vyplnit alespon jmeno");
    }
    pushDigger = false;
  };
  // odstraneni pracovnika
  const handleDelete = (id) => {
    setListOfDiggers(listOfDiggers.filter((digger) => digger.id !== id));
  };

  //VYSTUP
  return (
    <>
      <MainContainer>
        {/* PREPINANI TAB */}
        <TabNames>
          <TabButton
            name="diggers-tab"
            activeTab={activeTab}
            onClick={(event) => {
              switchTab(event, "diggers-tab");
            }}
          >
            Zamestnanci
          </TabButton>
          <TabButton
            name="tasks-tab"
            activeTab={activeTab}
            onClick={(event) => {
              switchTab(event, "tasks-tab");
            }}
          >
            Ukoly
          </TabButton>
        </TabNames>

        {/* KONEC TLACITEK ZACATEK TAB */}
        {activeTab === "diggers-tab" && (
          <>
            <DiggersTab>
              <h1>KOPACI</h1>
              {/* smycka vypisujici kopace */}
              {/* {diggers.map((digger) => (
                <Person key={digger.id}>
                  {digger.name} vykope {digger.metersPerHour} metru za hodinu
                </Person>
              ))} */}
              {/* ///////////////////////////// */}
              <DiggerListWrap name="diggerList">
                {listOfDiggers.map((digger) => (
                  <Person key={digger.id} name={digger.name}>
                    {digger.name}
                    {" ("}
                    {digger.gender === "m"
                      ? "muz"
                      : digger.gender === "f"
                      ? "zena"
                      : "neurceno"}
                    {") - kopajici tempem"} {digger.gender == "f" ? 0.5 : 1}{" "}
                    {" m/hod"}
                    <button
                      onClick={() => {
                        handleDelete(digger.id);
                      }}
                    >
                      X
                    </button>
                  </Person>
                ))}
              </DiggerListWrap>
              {/* VSTUP */}

              <DiggerInputs name="diggerForm">
                <input
                  type="text"
                  placeholder="Jmeno pracovnika"
                  className="inputClass"
                  name="name"
                  value={addDigger.name}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  placeholder="m=muz, f=zena"
                  className="inputClass"
                  name="gender"
                  id="gender"
                  value={addDigger.gender}
                  onChange={handleChange}
                />
                <label htmlFor="metersPerHour">kope metru za hodinu</label>
                {/* nemuze byt klasicke for, ale htmlFor */}
                <input
                  type="number"
                  min="0.5"
                  max="1"
                  step="0.5"
                  className="inputClass"
                  name="metersPerHour"
                  id="metersPerHour"
                  //value={addDigger.metersPerHour}
                  value={addDigger.gender == "f" ? 0.5 : 1}
                  disabled
                  onChange={handleChange}
                />
                <PlanTasksButton className="inputClass" onClick={handleAdd}>
                  Přidat
                </PlanTasksButton>
              </DiggerInputs>
            </DiggersTab>
          </>
        )}

        {/* TAB S PLANOVANYMI UKOLY */}
        {activeTab === "tasks-tab" && (
          <>
            <TasksTab>
              {/* zde se nacita komponent ze souboru tasksTabComp.js */}
              <HomeTasks />
            </TasksTab>
          </>
        )}
      </MainContainer>
    </>
  );
}
