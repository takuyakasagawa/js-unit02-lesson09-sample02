import PasswordValidator from './passwordValidator';

describe('password validator', () => {
  it("should success with valid value", () => {
    const password = "samplePass1"; // ①
    const validator = new PasswordValidator(password); 
    return validator.validate() // ②
      .then((res) => {
        expect(res).toEqual({ // ③
          success: true
        });
    });
  });
});

it('空の場合は失敗を返す', () => {
	const password = "";
	const validator = new PasswordValidator(password); 
	return validator.validate()
		.then((res) => {
			expect(res).toEqual({
				success: false,
				message: 'パスワードは必須です。'
			});
	});
});
it('短すぎる場合は失敗を返す', () => {
	const password = "test";
	const validator = new PasswordValidator(password); 
	return validator.validate() 
		.then((res) => {
			expect(res).toEqual({
				success: false,
				message: 'パスワードが短すぎます。'
			});
	});
});

it("大文字、小文字、数字を全て含まない場合はエラーを返す。", async () => {
  const password1 = "testPass";
  const password2 = "testpass1";
  const password3 = "TESTPASS1";
  const validator1 = new PasswordValidator(password1);
  const validator2 = new PasswordValidator(password2);
  const validator3 = new PasswordValidator(password3);
  const res1 = await validator1.validate().then(res => res);
  const res2 = await validator2.validate().then(res => res);
  const res3 = await validator3.validate().then(res => res);
  expect(res1.success).toBeFalsy();
  expect(res2.success).toBeFalsy();
  expect(res3.success).toBeFalsy();
  expect(res3.message).toBe('パスワードは大文字、小文字、数字全てを含む必要があります。');
})