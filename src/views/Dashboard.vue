<template>
  <div id="dashboard">
    <transition name="fade">
      <CommentModal v-if="showCommentModal" :post="selectedPost" @close="toggleCommentModal()"></CommentModal>
    </transition>
    <section>
      <div class="col1">
        <div class="profile">
          <h5>{{ userProfile.name }}</h5>
          <p>{{ userProfile.title }}</p>
          <div class="create-post">
            <p>Create a post</p>
            <hr>
            <div class="img-upload">
              <input type="file" @change="onFileChange" />
              <div v-if="imageUrl" class="img-preview mt-3 d-flex justify-content-center">
                <img :src="imageUrl" />
              </div>
            </div>
            <hr>
            <form @submit.prevent>
              <textarea placeholder="What's up?" v-model.trim="post.content"></textarea>
              <button @click="createPost()" :disabled="post.content === ''" class="button">Post</button>
            </form>

          </div>
        </div>
      </div>
      <div class="col2">
        <div v-if="posts.length">
          <div v-for="post in posts" :key="post.id" class="post">
            <h5>{{ post.userName }}</h5>
            <span>{{ post.createdOn | formatDate }}</span>
            <p class="pb-2">{{ post.content | trimLength }}</p>
            <img :src="post.imageUrl">
            <ul>
              <li><a @click="toggleCommentModal(post)">Comments {{ post.comments }}</a></li>
              <li><a @click="likePost(post.id, post.likes)">Likes {{ post.likes }}</a></li>
              <li><a @click="viewPost(post)">View full post</a></li>
            </ul>
          </div>
        </div>
        <div v-else>
          <p class="no-results">There are currently no posts</p>
        </div>
      </div>
    </section>

    <!-- full post modal -->
    <transition name="fade">
      <div v-if="showPostModal" class="p-modal">
        <div class="p-container">
          <a @click="closePostModal()" class="close">
            <i class="fas fa-times"></i>
          </a>
          <div class="post d-flex flex-column">
            <h5>{{ fullPost.userName }}</h5>
            <span>{{ fullPost.createdOn | formatDate }}</span>
            <div v-show="fullPost.imageUrl !== ''" class="align-self-center py-2">
              <img :src="fullPost.imageUrl">
            </div>
            <p>{{ fullPost.content }}</p>
            <ul>
              <li><a>Comments {{ fullPost.comments }}</a></li>
              <li><a>Likes {{ fullPost.likes }}</a></li>
            </ul>
          </div>
          <div v-show="postComments.length" class="comments">
            <div v-for="comment in postComments" :key="comment.id" class="comment">
              <p>{{ comment.userName }}</p>
              <span>{{ comment.createdOn | formatDate }}</span>
              <p>{{ comment.content }}</p>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { commentsCollection } from '@/firebase'
import { mapState } from 'vuex'
import moment from 'moment'
import CommentModal from '@/components/CommentModal'

export default {
  components: {
    CommentModal
  },
  data() {
    return {
      post: {
        content: ''
      },
      showCommentModal: false,
      selectedPost: {},
      showPostModal: false,
      fullPost: {},
      postComments: [],
      imageUrl: null,
      imageData: null
    }
  },
  computed: {
    ...mapState(['userProfile', 'posts'])
  },
  methods: {
    onFileChange(e) {
      const file = e.target.files[0];
      this.imageData = file;
      this.imageUrl = URL.createObjectURL(file);
    },
    async createPost() {
      this.$store.dispatch('createPost', { content: this.post.content, imageData: this.imageData })
      this.post.content = ''
    },
    toggleCommentModal(post) {
      this.showCommentModal = !this.showCommentModal

      // if opening modal set selectedPost, else clear
      if (this.showCommentModal) {
        this.selectedPost = post
      } else {
        this.selectedPost = {}
      }
    },
    likePost(id, likesCount) {
      this.$store.dispatch('likePost', { id, likesCount })
    },
    async viewPost(post) {
      const docs = await commentsCollection.where('postId', '==', post.id).get()

      docs.forEach(doc => {
        let comment = doc.data()
        comment.id = doc.id
        this.postComments.push(comment)
      })

      this.fullPost = post
      this.showPostModal = true
    },
    closePostModal() {
      this.postComments = []
      this.showPostModal = false
    }
  },
  filters: {
    formatDate(val) {
      if (!val) { return '-' }

      let date = val.toDate()
      return moment(date).fromNow()
    },
    trimLength(val) {
      if (val.length < 200) { return val }
      return `${val.substring(0, 200)}...`
    }
  }
}
</script>

<style lang="scss" scoped>
  img {
    max-width: 300px;
    border: 1px solid lightgray;
  }
</style>
