import Api from '@/services/Api'

export default {
  fetchPosts (page) {
    return Api().get('colleges', {
      params: {
        page
      }
    })
  }
}
