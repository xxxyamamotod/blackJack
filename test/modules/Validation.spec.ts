import Validation from '@/modules/Validation'

describe('Validationクラス', () => {
    describe('nextメソッド', () => {
        const toBeTested = new Validation<string>()

        test('nextを呼び出す前後でインスタンスが異なること', () => {
            expect(toBeTested).not.toStrictEqual(
                toBeTested.next(() => true, 'test')
            )
        })
        test('nextメソッドでチェーンできること', () => {
            expect(() => {
                toBeTested.next(() => true, 'test').next(() => false, 'test2')
            }).not.toThrow()
        })
    })
    describe('resultメソッド', () => {
        test('validationにひっかからなかったら、resultメソッドで指定しているdefaultResultが返されること', () => {
            expect(
                new Validation<string>([
                    {
                        validation: () => true,
                        result: 'デフォルトのresult',
                    },
                ]).result('この値が返されること！')
            ).toStrictEqual('この値が返されること！')
        })
        test('validationにひっかかったら、resultメソッドで指定しているdefaultResultは返さないこと', () => {
            expect(
                new Validation<string>([
                    {
                        validation: () => false,
                        result: 'デフォルトのresult',
                    },
                ]).result('この値は返されないこと!')
            ).toStrictEqual('デフォルトのresult')
        })
    })
})
