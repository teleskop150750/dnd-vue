import { ref } from 'vue'

export function useAnnouncement() {
  const announcement = ref('')

  function announce(value: string | undefined) {
    if (value !== undefined && value !== null) {
      announcement.value = value
    }
  }

  return { announce, announcement } as const
}
