<template>
    <div>
        <div
            v-for="profileDefinition in profileDefinitions"
            :key="profileDefinition.name"
        >
            <v-text-field
                v-model="profile[profileDefinition.name]"
                :type="profileDefinition.type"
                :label="profileDefinition.name"
                @input="canDisplayError[profileDefinition.name] = true"
            ></v-text-field>
            <span
                v-if="canDisplayError[profileDefinition.name]"
                class="red--text"
                >{{ profileError[profileDefinition.name] }}</span
            >
        </div>
        <v-btn
            @click="
                allowErrorToBeDisplayed()
                submit()
            "
            >SUBMIT</v-btn
        >
    </div>
</template>

<script lang="ts">
import {
    computed,
    defineComponent,
    reactive,
    useContext,
} from '@nuxtjs/composition-api'
import Validation from '@/modules/Validation'
import {
    maxNumberOfCharactersOfName,
    maxNumberOfCharactersOfEmail,
    maxNumberOfCharactersOfPassword,
} from '@/modules/config'

type Profile = {
    name: string
    email: string
    password: string
    passwordConfirmation: string
}
type ProfileValidations = { [P in keyof Profile]: Validation<string> }
type ProfileError = { [P in keyof Profile]: string }
type CanDisplayError = { [P in keyof Profile]: boolean }
type ProfileDefinition = {
    readonly name: keyof Profile
    readonly type: string
}

const profileDefinitions: ProfileDefinition[] = [
    {
        name: 'name',
        type: 'text',
    },
    {
        name: 'email',
        type: 'email',
    },
    {
        name: 'password',
        type: 'password',
    },
    {
        name: 'passwordConfirmation',
        type: 'password',
    },
]

export default defineComponent({
    setup() {
        const { $axios } = useContext()
        const profile = reactive<Profile>({
            name: '',
            email: '',
            password: '',
            passwordConfirmation: '',
        })

        const profileValidations: ProfileValidations = {
            name: new Validation<string>()
                .next(
                    () => profile.name.length > 0,
                    '名前が入力されていません。'
                )
                .next(
                    () => profile.name.length <= maxNumberOfCharactersOfName,
                    '名前は50文字以下にしてください。'
                ),
            email: new Validation<string>()
                .next(
                    () => profile.email.length > 0,
                    'メールアドレスが入力されていません。'
                )
                .next(
                    () => profile.email.length <= maxNumberOfCharactersOfEmail,
                    'メールアドレスは50文字以下にしてください。'
                ),
            password: new Validation<string>()
                .next(
                    () => profile.password.length > 0,
                    'パスワードが入力されていません。'
                )
                .next(
                    () =>
                        profile.password.length <=
                        maxNumberOfCharactersOfPassword,
                    '名前は100文字以下にしてください。'
                ),
            passwordConfirmation: new Validation<string>()
                .next(
                    () => profile.passwordConfirmation.length > 0,
                    '確認用パスワードが入力されていません。'
                )
                .next(
                    () => profile.password === profile.passwordConfirmation,
                    'パスワードが一致しません。'
                ),
        } as const

        const profileError = computed(
            (): ProfileError => ({
                name: profileValidations.name.result(''),
                email: profileValidations.email.result(''),
                password: profileValidations.password.result(''),
                passwordConfirmation:
                    profileValidations.passwordConfirmation.result(''),
            })
        )
        const isThereAnError = computed((): boolean =>
            Object.values(profileError.value).some((error) => error)
        )

        const canDisplayError = reactive<CanDisplayError>({
            name: false,
            email: false,
            password: false,
            passwordConfirmation: false,
        })
        const allowErrorToBeDisplayed = (): void => {
            Object.assign<CanDisplayError, CanDisplayError>(canDisplayError, {
                name: true,
                email: true,
                password: true,
                passwordConfirmation: true,
            })
        }

        const submit = (): void => {
            if (isThereAnError.value) {
                return
            }

            $axios
                .$post(
                    `${process.env.API_URL}/customers/`,
                    new URLSearchParams(profile)
                )
                .then((response) => {
                    console.log(response)
                })
                .catch((error): void => {
                    console.log(error)
                })
        }

        return {
            profile,
            profileDefinitions,
            profileError,
            canDisplayError,
            allowErrorToBeDisplayed,
            submit,
        }
    },
})
</script>
