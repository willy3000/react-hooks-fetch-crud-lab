import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

const url = "http://localhost:4000/questions";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([]);

  const getQuestions = () => {
    try {
      fetch(url)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          console.log(data);
          setQuestions(data);
        });
    } catch (err) {}
  };

  const handleDelete = (id) => {
    try {
      fetch(`${url}/${id}`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
        },
      }).then(() => {
        getQuestions();
      });
    } catch (err) {}
  };

  const handleAdd = (values) => {
    try {
      fetch(url, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(values),
      }).then(() => {
        getQuestions();
      });
    } catch (err) {}
  };

  useEffect(() => {
    getQuestions();
  }, []);

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? (
        <QuestionForm {...{ questions, handleAdd }} />
      ) : (
        <QuestionList {...{ questions, handleDelete }} />
      )}
    </main>
  );
}

export default App;
