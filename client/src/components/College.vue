<template>
  <div class="college">
    <div class="card">
      <div class="name">
        {{ college['school.name'] }}
      </div>
      <div class="details">
        <p>
          <span>Acceptance:</span>
          <span v-bind:class="getAcceptanceClass(college['latest.admissions.admission_rate.overall'])">
            {{ college['latest.admissions.admission_rate.overall'] | percent }}
          </span>
        </p>
        <p>
          <span>Size:</span>
          <span v-bind:class="getSizeClass(college['latest.student.size'])">
            {{ college['latest.student.size'] }}
          </span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'college',
  props: ['college'],
  filters: {
    percent (val) {
      if (val) {
        return (val * 100).toFixed(2) + '%'
      }
      return 'N/A'
    }
  },
  methods: {
    getAcceptanceClass (property) {
      if (property < 0.25) {
        return 'low'
      } else if (property < 0.5) {
        return 'middle'
      }
      return 'high'
    },
    getSizeClass (property) {
      if (property < 5000) {
        return 'small'
      } else if (property < 15000) {
        return 'medium'
      }
      return 'large'
    }
  }
}
</script>

<style scoped>
  .college {
    display: flex;
    justify-content: center;
    width: 30%;
  }
  .card {
    width: 100%;
    height: 10rem;
    box-shadow: 0 2px 4px grey;
    margin-bottom: 1rem;
    padding: 0.5rem;
    display: flex;
    flex-direction:column;
  }

  @media (max-width: 720px) {
    .college{
      width: 100%;
    }
  }
  .name {
    height: 50%;
    font-size: 1.25rem;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: center;
    color:#16d2aa;
  }
  .details{
    height: 50%;
  }
  .low {
    color:violet
  }
  .middle {
    color:red
  }
  .high {
    color:orange
  }
  .small {
    color:green
  }
  .medium {
    color:blue
  }
  .large {
    color:purple
  }
</style>
