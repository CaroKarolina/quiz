onload = function () {
  quiz.init();
};

class Quiz {
  currentQuestionIndex = 0;
  alertHeadingEl = null;
  formCheckInputListEl = null;
  questionParagraphEl = null;
  saveBtnEl = null;
  nextBtnEl = null;
  correctAnswearIndex = null;
  correctAnswersAmount = 0;
  wrongAnswersAmount = 0;
  modalEl = null;
  questions = [];
  questionMaker(q, a, c) {
    const question = {
      q: q,
      a: a,
      correctAnswearIndex: c,
    };
    this.questions.push(question);
  }

  init() {
    this.initModal();

    this.alertHeadingEl = document.querySelector(".alert-heading");
    this.formCheckInputListEl = document.querySelectorAll(".form-check input");
    this.questionParagraphEl = document.querySelector(".question-paragraph");
    this.saveBtnEl = document.querySelector(".save-btn");
    this.nextBtnEl = document.querySelector(".next-btn");

    this.setNextQuestionData();
    this.saveBtnEl.addEventListener("click", this.checkedAnswear);
    this.nextBtnEl.addEventListener("click", this.setNextQuestionData);
  }

  setNextQuestionData = () => {
    this.nextBtnEl.classList.add("disabled");
    this.saveBtnEl.classList.remove("disabled");

    if (this.currentQuestionIndex >= this.questions.length) {
      this.showModal();
      return;
    }

    const infoHeading = `Pytanie ${this.currentQuestionIndex + 1} z ${
      this.questions.length
    }: `;

    const currentQuestion = this.questions[this.currentQuestionIndex];

    this.alertHeadingEl.innerHTML = `${infoHeading} <br> ${currentQuestion["q"]}`;

    this.formCheckInputListEl.forEach((el) => {
      const formCheckInputNumber = el.getAttribute("data-index");
      el.nextElementSibling.textContent =
        currentQuestion["a"][formCheckInputNumber];
    });

    const correctAnswear = currentQuestion["correctAnswearIndex"];
    this.correctAnswearIndex = correctAnswear;
    this.currentQuestionIndex++;

    this.clearData()

    this.nextBtnEl.classList.add("disable");
  };

  checkedAnswear = () => {
    this.saveBtnEl.classList.add("disabled");
    this.nextBtnEl.classList.remove("disabled");
    const userSelectedInput = document.querySelector("input:checked");
    if (!userSelectedInput) return;

    const selectedIndex = userSelectedInput.getAttribute("data-index");
    console.log(userSelectedInput, this.correctAnswearIndex);

    if (selectedIndex == this.correctAnswearIndex) {
      userSelectedInput.classList.add("is-valid");
      this.correctAnswersAmount++;
      this.setUserStats("correct", this.correctAnswersAmount);
    } else {
      userSelectedInput.classList.add("is-invalid");
      this.wrongAnswersAmount++;
      this.setUserStats("wrong", this.wrongAnswersAmount);
    }
  };

  setUserStats = (res, counter) => {
    const spanInfoEl = document.getElementById(`${res}-answers`);
    spanInfoEl.innerText = counter;
  };

  clearData = () => {
    this.formCheckInputListEl.forEach((el) => {
      el.classList.remove("is-valid");
      el.classList.remove("is-invalid");
      el.checked = false;
    });
  }

  resetQuiz = () => {
    this.clearData
    this.currentQuestionIndex = 0
    this.setNextQuestionData()
    this.setUserStats("correct", 0);
    this.setUserStats("wrong", 0);
  }

  initModal = () => {
    this.modalEl = new bootstrap.Modal(document.querySelector(".modal"));
    document.querySelector(".modal-btn").addEventListener("click", this.resetQuiz);
  };

  showModal = () => {
    const finalResEl = document.querySelector(".modal-body");
    const finalRes = (
      (this.correctAnswersAmount * 100) /
      this.questions.length
    ).toFixed(2);
    finalResEl.innerText = `Udzielono ${finalRes}% poprawnych odpowiedzi`;
    this.modalEl.toggle();
  };
}

const quiz = new Quiz();

//baza danych
const q1 = quiz.questionMaker("Wynik dzielenia 10 / 2 to", [2, 4, 5], 2);
const q2 = quiz.questionMaker("Wynik dzielenia 20 / 2 to", [8, 10, 3], 1);
const q3 = quiz.questionMaker("Wynik dzielenia 30 / 1 to", [30, 0, 15], 0);
