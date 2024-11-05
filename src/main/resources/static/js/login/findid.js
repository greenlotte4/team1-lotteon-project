<!--
  날짜 : 2024/11/04
  이름 : 이도영
  내용 : 아이디 검사
-->
window.onload = function () {
    // 유효성 검사에 사용할 상태변수
    let isNameOk = false;
    let isEmailOk = false;
    const registerForm = document.querySelector('.sendForm');
    const auth = document.querySelector('.auth');
    const resultName = document.querySelector('.resultName');
    // 유효성 검사에 사용할 정규표현식
    const patterns = {
        name: /^[가-힣]{2,10}$/,
        email: /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i,
    };
    // 함수: 유효성 검사 결과 표시
    const showResult = (element, message, isValid) => {
        element.innerText = message;
        element.style.color = isValid ? 'green' : 'red';
    };

    // 이름 유효성 검사
    const NameInput = document.getElementsByName('name')[0];
    NameInput.addEventListener('focusout', function () {
        const name = NameInput.value;
        if (!name.match(patterns.name)) {
            showResult(resultName, "이름이 유효하지 않습니다.", false);
            isNameOk = false;
        } else {
            resultName.innerText = "";  // 메시지 지우기
            isNameOk = true;
        }
    });

    // 이메일 유효성 검사 및 인증코드 발송
    const resultEmail = document.getElementById('resultEmail');
    const btnSendEmail = document.getElementById('btnSendEmail');
    const EmailInput = document.querySelector('input[name="email"]');
    const btnAuthEmail = document.getElementById('btnAuthEmail');
    const authInput = document.querySelector('.userauth'); // 인증 코드 입력 필드

    btnSendEmail.addEventListener('click', async function (e) {
        console.log("clicked");
        e.preventDefault(); // 기본 제출 동작 막기
        const value = EmailInput.value;
        if (!value.match(patterns.email)) {
            showResult(resultEmail, '이메일 형식이 맞지 않습니다.', false);
            isEmailOk = false;
            return;
        }
        const data = await fetchGet(`/user/Register/sendemail/${value}`);
        if (data.result) {
            showResult(resultEmail, '인증코드가 발송되었습니다.', true);
            auth.style.display = 'block';  // 인증 필드 활성화
            isEmailOk = true;
        } else {
            showResult(resultEmail, '등록되어 있지 않은 이메일 입니다', false);
            isEmailOk = false;
        }
    });

    // 이메일 인증코드 확인
    btnAuthEmail.addEventListener('click', async function (e) {
        e.preventDefault();
        const code = authInput.value;  // 사용자가 입력한 인증 코드
        const jsonData = {"code": code};
        const data = await fetchPost(`/user/Register/email`, jsonData);

        if (!data.result) {
            showResult(resultEmail, '인증코드가 일치하지 않습니다.', false);
            isEmailVerified = false;
        } else {
            showResult(resultEmail, '이메일이 인증되었습니다.', true);
            isEmailVerified = true;
        }
    });
    // 최종 폼 전송 유효성 검사
    registerForm.onsubmit = function (e) {
        // 이름 유효성 검사 완료 여부
        if (!isNameOk) {
            alert('이름이 유효하지 않습니다.');
            e.preventDefault(); // 폼 전송 취소
            return false;
        }
        // 이메일 유효성 검사 완료 여부
        if (!isEmailOk || !isEmailVerified) {
            alert('이메일이 인증되지 않았습니다.');
            e.preventDefault(); // 폼 전송 취소
            return false;
        }
        return true;
    }
}