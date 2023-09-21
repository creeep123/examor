import { defineStore } from 'pinia'
import { PROFILE_API } from '@/apis'
import { useFetch } from '@/hooks'
import { useMessageStore } from './message'

export type ProfileState = {
  profile: Record<ProfileKey, ProfileItem>
  confirmLoading: boolean
}

export type ProfileKey =
  | 'questionAmount'
  | 'currentRole'
  | 'currentModel'
  | 'openaiModel'
  | 'openaiKey'
  | 'openaiOrganization'
  | 'openaiBase'
  | 'openaiProxy'
  | 'azureKey'
  | 'azureBase'
  | 'openaiVersion'
  | 'deploymentName'
  | 'notionKey'

type Model = 'OpenAI' | 'Azure'

export type ProfileItem = {
  value: string | Model
  show?: boolean // show or hide key
  error?: boolean // error field
}

const state: ProfileState = {
  profile: {
    questionAmount: {
      value: '',
    },
    currentRole: {
      value: '',
    },
    currentModel: {
      value: '',
    },
    openaiModel: {
      value: '',
      show: false,
      error: false,
    },
    openaiKey: {
      value: '',
      show: false,
      error: false,
    },
    openaiOrganization: {
      value: '',
      show: false,
      error: false,
    },
    openaiBase: {
      value: '',
      show: false,
      error: false,
    },
    openaiProxy: {
      value: '',
      show: false,
      error: false,
    },
    azureKey: {
      value: '',
      show: false,
      error: false,
    },
    azureBase: {
      value: '',
      error: false,
    },
    openaiVersion: {
      value: '',
      error: false,
    },
    deploymentName: {
      value: '',
      error: false,
    },
    notionKey: {
      value: '',
      show: false,
      error: false,
    },
  },

  confirmLoading: false,
} as const

export const useProfileStore = defineStore('profileStore', {
  state: () => state,

  actions: {
    async getProfile() {
      const [_getKeys] = useFetch(PROFILE_API.getProfile)
      const { data } = await _getKeys()

      for (const key in data) {
        if (Object.prototype.hasOwnProperty.call(this.$state.profile, key)) {
          const profileKey = key as ProfileKey
          this.$state.profile[profileKey].value = data[key]
        }
      }
    },

    async setProfile() {
      const [_setKeys, loading] = useFetch(PROFILE_API.setProfile)
      this.$state.confirmLoading = loading

      const data: any = {}
      for (const key in this.$state.profile) {
        const profileKey = key as ProfileKey
        data[key] = this.$state.profile[profileKey].value || ''
      }

      await _setKeys(data)
    },

    checkHasSettedModel() {
      const MESSAGE_STORE = useMessageStore()
      const { profile } = this.$state

      if (
        profile.currentModel.value === 'OpenAI' &&
        !this._checkHasSettedOpenai()
      ) {
        MESSAGE_STORE.show('message.OpenAIKeyError', 'button', '/profile')
        return false
      }

      if (
        profile.currentModel.value === 'Azure' &&
        !this._checkHasSettedAzure()
      ) {
        MESSAGE_STORE.show('message.AzureKeyError', 'button', '/profile')
        return false
      }

      return true
    },

    _checkHasSettedOpenai() {
      const { profile } = this.$state
      if (!profile.openaiKey.value) {
        profile.openaiKey.error = true
        return false
      } else return true
    },

    _checkHasSettedAzure() {
      const { profile } = this.$state
      let res = true
      if (!profile.azureKey.value) {
        profile.azureKey.error = true
        res = false
      }

      if (!profile.azureBase.value) {
        profile.azureBase.error = true
        res = false
      }

      if (!profile.deploymentName.value) {
        profile.deploymentName.error = true
        res = false
      }

      if (!profile.openaiVersion.value) {
        profile.openaiVersion.error = true
        res = false
      }
      return res
    },

    clearError() {
      const { profile } = this.$state
      for (const key in profile) {
        if (Object.prototype.hasOwnProperty.call(profile, key)) {
          const profileKey = key as ProfileKey
          if (profile[profileKey].error) profile[profileKey].error = false
        }
      }
    },
  },
})
