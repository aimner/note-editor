import React from "react";
import classes from "./App.module.scss";
import { AllTags } from "./components/AllTags/AllTags";
import { Form } from "./components/Form/Form";
import { Notes } from "./components/Notes/Notes";

const App: React.FC = () => {
  return (
    <div className={classes.App}>
      <AllTags></AllTags>
      <Form />
      <Notes />
    </div>
  );
};

export default App;
