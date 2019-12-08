<template>
  <div class="colleges">
    <div class="header">
      <h1>NY Colleges - Bachelor’s in Education</h1>
    </div>
    <div class="menu">
      <div class="filters">
        <button class="btn" v-on:click="resetFilters()">Reset</button>
        <dropdown text="Size">
          <dropdown-content>
            <dropdown-item
              v-on:click="filter('latest.student.size', 'small')"
            >
              Small
            </dropdown-item>
            <dropdown-item
              v-on:click="filter('latest.student.size', 'medium')"
            >
              Medium
            </dropdown-item>
            <dropdown-item
              v-on:click="filter('latest.student.size', 'large')"
            >
              Large
            </dropdown-item>
          </dropdown-content>
        </dropdown>
        <dropdown text="Acceptance">
          <dropdown-content>
            <dropdown-item
              v-on:click="filter('latest.admissions.admission_rate.overall', 'low')"
            >
              &lt; 25%
            </dropdown-item>
            <dropdown-item
              v-on:click="filter('latest.admissions.admission_rate.overall', 'middle')"
            >
              25% &lt; x &lt; 75%
            </dropdown-item>
            <dropdown-item
              v-on:click="filter('latest.admissions.admission_rate.overall', 'high')"
            >
              &gt; 75%
            </dropdown-item>
          </dropdown-content>
        </dropdown>
      </div>
      <div class="sorts">
        <dropdown text="Sort">
          <dropdown-content right=true>
            <dropdown-item
              v-on:click="sort('school.name', 'ASC')"
            >
              A->Z
            </dropdown-item>
            <dropdown-item
              v-on:click="sort('school.name', 'DESC')"
            >
              Z->A
            </dropdown-item>
            <dropdown-item
              v-on:click="sort('latest.student.size', 'ASC')"
            >
              Smallest
            </dropdown-item>
            <dropdown-item
              v-on:click="sort('latest.student.size', 'DESC')"
            >
              Largest
            </dropdown-item>
          </dropdown-content>
        </dropdown>
      </div>
    </div>
    <div v-if="errors" class="error-container">
      <error-notification
        v-for="(error, i) in errors"
        v-bind:error="error"
        v-bind:key="i"
      />
    </div>
    <div v-if="isFullyLoaded" class="colleges-container">
      <college
        v-for="college in sortedFilteredColleges"
        v-bind:college="college"
        v-bind:key="college.id"
      ></college>
    </div>
    <div v-else class="loading-container">
      <font-awesome-icon pulse icon="spinner" size="2x" />
    </div>
  </div>
</template>

<script>
import CollegesService from '@/services/CollegesService'
import College from '@/components/College'
import Dropdown from '@/components/Dropdown/Dropdown'
import DropdownContent from '@/components/Dropdown/DropdownContent'
import DropdownItem from '@/components/Dropdown/DropdownItem'
import ErrorNotification from '@/components/ErrorNotification'
import sortColleges from '@/util/sortColleges'
import filterColleges from '@/util/filterColleges'

/* eslint-disable camelcase */
export default {
  name: 'colleges',
  components: {
    College,
    Dropdown,
    DropdownContent,
    DropdownItem,
    ErrorNotification
  },
  data () {
    return {
      colleges: [],
      isFullyLoaded: false,
      errors: [],
      currentSort: 'school.name',
      currentSortDir: 'ASC',
      filters: {
        'latest.student.size': null,
        'latest.admissions.admission_rate.overall': null
      }
    }
  },
  mounted () {
    this.getColleges()
  },
  computed: {
    sortedFilteredColleges: function () {
      sortColleges(this.colleges, this.currentSort, this.currentSortDir)
      return filterColleges(this.colleges, this.filters)
    }
  },
  methods: {
    async getColleges () {
      let nextPage = 0
      let pagedata
      do {
        const {data: {metadata, results, errors}} = await CollegesService.fetchPosts(nextPage)
        if (errors) {
          this.errors = errors
          this.colleges = []
          break
        }
        nextPage = metadata.page + 1
        pagedata = metadata
        this.colleges = [...this.colleges, ...results]
      } while (nextPage < pagedata.total / pagedata.per_page)
      this.isFullyLoaded = true
    },
    sort (field, direction) {
      this.currentSort = field
      this.currentSortDir = direction
    },
    filter (field, value) {
      this.filters[field] = value
    },
    resetFilters () {
      this.filter('latest.admissions.admission_rate.overall', null)
      this.filter('school.name', null)
    }
  }
}
</script>

<style scoped>
  .colleges{
    margin: 5vw;
  }
  .menu {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;
  }
  .colleges-container{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
  .loading-container{
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-top: 15rem;
  }
  .btn{
    color: #fff;
    background-color: #16d2aa;
    border-color: #16d2aa;
    padding: .375rem .75rem;
    font-size: 1rem;
    line-height: 1.5;
    border-radius: .25rem;
    font-weight: 400;
    text-align: center;
    vertical-align: middle;
}
</style>
