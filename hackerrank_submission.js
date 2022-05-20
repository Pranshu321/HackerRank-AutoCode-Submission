const puppeteer = require("puppeteer");
const codesSolution = require("./codesolution");

let page;
let username = "chardarmod";
let password = "char1234";

function waitAndClick(selector, cPage) {
	return new Promise(function (resolve, reject) {
		let waitForModelPromise = cPage.waitForSelector(selector);
		waitForModelPromise
			.then(function () {
				let clickModal = cPage.click(selector, { delay: 2000 });
				return clickModal;
			})
			.then(function () {
				resolve();
			})
			.catch(function (err) {
				reject();
			});
	});
}
const browseropen = puppeteer.launch({
	headless: false,
	slowMo: true,
	defaultViewport: null,
	args: ["--start-maximized"],
});

browseropen
	.then((browser) => {
		console.log("browser opened");
		let browseropen = browser.pages();
		return browseropen;
	})
	.then((browserpages) => {
		page = browserpages[0];
		let gotopromise = page.goto("https://www.hackerrank.com/auth/login");
		return gotopromise;
	})
	.then(() => {
		let pagefullreload = page.waitForSelector("input[id='input-1']");
		return pagefullreload;
	})
	.then(() => {
		let Logincreadentials = page.type("input[id='input-1']", username, {
			delay: 20,
		});
		return Logincreadentials;
	})
	.then(() => {
		let Logincreadentials = page.type("input[type='password']", password, {
			delay: 20,
		});
		return Logincreadentials;
	})
	.then(() => {
		let login = page.click('button[data-analytics="LoginPassword"]', {
			delay: 50,
		});
		return login;
	})
	.then(() => {
		let pagefullreload = page.waitForSelector('a[data-attr1="algorithms"]');
		return pagefullreload;
	})
	.then(() => {
		let algorithms = page.click('a[data-attr1="algorithms"]', { delay: 200 });
		return algorithms;
	})
	.then(function () {
		let Warmupcheckbox = waitAndClick('input[value="warmup"]', page);
		return Warmupcheckbox;
	})
	.then(function () {
		let fullpageload = page.waitForSelector(".challenge-submit-btn");
		return fullpageload;
	})
	.then(function () {
		let allChallengesPromise = page.$$(".challenge-submit-btn", {
			delay: 2000,
		});
		return allChallengesPromise;
	})
	.then(function (questionslist) {
		console.log("Total questions present : ", questionslist.length);
		questionSolver(page, questionslist[2], codesSolution.answers[0]);
	});

function questionSolver(page, question, answer) {
	let questionWillBeClicked = question.click();
	questionWillBeClicked.then(function () {
		let editorInFocusPromise = waitAndClick(
			".monaco-editor.no-user-select.vs",
			page
		);
		editorInFocusPromise
			.then(function () {
				return waitAndClick('input[type="checkbox"]', page);
			})
			.then(function () {
				return page.waitForSelector("textarea.custominput", page);
			})
			.then(function () {
				return page.type("textarea.custominput", answer, { delay: 0 });
			})
			.then(function () {
				let ctrlIsPressed = page.keyboard.down("Control");
				return ctrlIsPressed;
			})
			.then(function () {
				let AisPressed = page.keyboard.press("A", { delay: 500 });
				return AisPressed;
			})
			.then(function () {
				let XisPressed = page.keyboard.press("X", { delay: 500 });
				return XisPressed;
			})
			.then(function () {
				let ctrlIsUnpressed = page.keyboard.up("Control");
				return ctrlIsUnpressed;
			})
			.then(function () {
				let mainEditorInFocusPromise = waitAndClick(
					".monaco-editor.no-user-select.vs",
					page
				);
				return mainEditorInFocusPromise;
			})
			.then(function () {
				let ctrlIsPressed = page.keyboard.down("Control");
				return ctrlIsPressed;
			})
			.then(function () {
				let AisPressed = page.keyboard.press("A", { delay: 500 });
				return AisPressed;
			})
			.then(function () {
				let VisPressed = page.keyboard.press("V", { delay: 500 });
				return VisPressed;
			})
			.then(function () {
				let submitCodeBtnIsPressed = page.click(".hr-monaco-submit");
				return submitCodeBtnIsPressed;
			});
	});
}
