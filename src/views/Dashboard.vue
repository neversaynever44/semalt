<template>
  <v-flex xs12 row>
    
  <v-layout py-3>
           <v-flex xs12>
          
<h1>Opportunities</h1>
        <ul>
            <li v-for="(val, i) in opportunityAudits" :key="i">
                <h1>Title: {{val.title}}</h1>
                <h2>Id: {{val.id}}</h2>
                <h3>Description: {{val.description}}</h3>
                <p>Group: {{val.group}}</p>
                <p>Score: {{val.score}}</p>
                <p>scoreDisplayMode: {{val.scoreDisplayMode}}</p>
            </li>
        </ul>


       <h1>DIAGNOSTIC</h1>
        <ul>
            <li v-for="(val, i) in diagnosticAudits" :key="i">
                <h1>Title: {{val.title}}</h1>
                <h2>Id: {{val.id}}</h2>
                <h3>Description: {{val.description}}</h3>
                <p>Group: {{val.group}}</p>
                <p>Score: {{val.score}}</p>
                <p>scoreDisplayMode: {{val.scoreDisplayMode}}</p>
            </li>
        </ul>

        <h1>AUDIT</h1>
        <ul>
           <li v-for="(val, i) in passedAudits" :key="i">
               <h1>Title: {{val.title}}</h1>
               <h2>Id: {{val.id}}</h2>
               <h3>Description: {{val.description}}</h3>
               <p>Group: {{val.group}}</p>
               <p>Score: {{val.score}}</p>
               <p>scoreDisplayMode: {{val.scoreDisplayMode}}</p>
           </li>
        </ul>


        </v-flex>

  </v-layout>

  <v-layout py-3>

 

        <v-flex xs12 sm10 offset-sm1>

          <v-card>
            <v-card-title>
              <div class="title">Nutrition Table</div>
              <v-spacer></v-spacer>
              <v-text-field
                v-model="search"
                append-icon="search"
                label="Search"
                single-line
                hide-details
              ></v-text-field>
            </v-card-title>
            <v-data-table
              :headers="headers"
              :loading="true"
              :items="desserts"
              :search="search"
              v-model="selected"
              item-key="name"
              select-all
            >
              <v-progress-linear slot="progress" color="blue" indeterminate></v-progress-linear>
              <template slot="headerCell" slot-scope="props">
                <v-tooltip bottom>
                  <span slot="activator">
                    {{ props.header.text }}
                  </span>
                  <span>
                    {{ props.header.text }}
                  </span>
                </v-tooltip>
              </template>
              <template slot="items" slot-scope="props">
                <td>
                  <v-checkbox
                    v-model="props.selected"
                    primary
                    hide-details
                  ></v-checkbox>
                </td>
                <td>{{ props.item.name }}</td>
                <td class="text-xs-right">{{ props.item.calories }}</td>
                <td class="text-xs-right">{{ props.item.fat }}</td>
                <td class="text-xs-right">{{ props.item.carbs }}</td>
                <td class="text-xs-right">{{ props.item.protein }}</td>
                <td class="text-xs-right">{{ props.item.iron }}</td>
              </template>
            </v-data-table>
        </v-card>
        </v-flex>
     </v-layout>
    
  </v-flex>
</template>

<script>
  import axios from "axios";

  export default {
    name: 'Dashboard',
    data () {
      return {
        audits: [],
        search: '',
        selected: [],
        PASS_THRESHOLD: 0.9,
        RATINGS: {
          PASS: {label: 'pass', minScore: this.PASS_THRESHOLD},
          AVERAGE: {label: 'average', minScore: 0.5},
          FAIL: {label: 'fail'},
          ERROR: {label: 'error'},
        },
        headers: [
          {
            text: 'Dessert (100g serving)',
            align: 'left',
            sortable: false,
            value: 'name'
          },
          { text: 'Calories', value: 'calories' },
          { text: 'Fat (g)', value: 'fat' },
          { text: 'Carbs (g)', value: 'carbs' },
          { text: 'Protein (g)', value: 'protein' },
          { text: 'Iron (%)', value: 'iron' }
        ],
        desserts: [
          {
            value: false,
            name: 'Frozen Yogurt',
            calories: 159,
            fat: 6.0,
            carbs: 24,
            protein: 4.0,
            iron: '1%'
          },
          {
            value: false,
            name: 'Ice cream sandwich',
            calories: 237,
            fat: 9.0,
            carbs: 37,
            protein: 4.3,
            iron: '1%'
          },
          {
            value: false,
            name: 'Eclair',
            calories: 262,
            fat: 16.0,
            carbs: 23,
            protein: 6.0,
            iron: '7%'
          },
          {
            value: false,
            name: 'Cupcake',
            calories: 305,
            fat: 3.7,
            carbs: 67,
            protein: 4.3,
            iron: '8%'
          },
          {
            value: false,
            name: 'Gingerbread',
            calories: 356,
            fat: 16.0,
            carbs: 49,
            protein: 3.9,
            iron: '16%'
          },
          {
            value: false,
            name: 'Jelly bean',
            calories: 375,
            fat: 0.0,
            carbs: 94,
            protein: 0.0,
            iron: '0%'
          },
          {
            value: false,
            name: 'Lollipop',
            calories: 392,
            fat: 0.2,
            carbs: 98,
            protein: 0,
            iron: '2%'
          },
          {
            value: false,
            name: 'Honeycomb',
            calories: 408,
            fat: 3.2,
            carbs: 87,
            protein: 6.5,
            iron: '45%'
          },
          {
            value: false,
            name: 'Donut',
            calories: 452,
            fat: 25.0,
            carbs: 51,
            protein: 4.9,
            iron: '22%'
          },
          {
            value: false,
            name: 'KitKat',
            calories: 518,
            fat: 26.0,
            carbs: 65,
            protein: 7,
            iron: '6%'
          }
        ]
      }
    },
    methods: {
       _getWastedMs(audit) {
                if(audit.group === "load-opportunities") {
                    console.log(audit.details.overallSavingsMs)
                    return audit.details.overallSavingsMs;
                } else {
                    return this.RATINGS.minScore;
                }
            },
       showAsPassed(audit) {
          switch (audit.scoreDisplayMode) {
              case 'manual':
              case 'notApplicable':
                  return true;
              case 'error':
              case 'informative':
                  return false;
              case 'numeric':
              case 'binary':
              default:
                  return Number(audit.score) >= this.RATINGS.PASS.minScore;
          }
        },

      fetchData() {
        const URL = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed/?url=https://habr.com/`,
              vm = this;
        axios.get(URL).then(function(res) {
          const data = res.data.lighthouseResult,
                dataAudits = Object.values(data.audits),
                dataRefs  = data.categories.performance.auditRefs;

          const itemsMap = dataAudits.reduce((map, item) => {
                           map[item.id] = item
                              return map
                          }, {})
            vm.audits = dataRefs
                          .filter((item) => itemsMap.hasOwnProperty(item.id))
                          .map((item) => ({
                            description: itemsMap[item.id].description,
                            details: itemsMap[item.id].details,
                            displayValue: itemsMap[item.id].displayValue,
                            id: item.id,
                            group: item.group,
                            score: itemsMap[item.id].score,
                            scoreDisplayMode: itemsMap[item.id].scoreDisplayMode,
                            title: itemsMap[item.id].title,
                        }));
           })
      }
      
    },
    computed: {
      opportunityAudits() {
        const opportunityAudits = this.audits
              .filter(audit => audit.group === 'load-opportunities' && !this.showAsPassed(audit))
              .sort((auditA, auditB) => this._getWastedMs(auditB) - this._getWastedMs(auditA));
        return opportunityAudits;
      },
      diagnosticAudits() {
        const diagnosticAudits = this.audits
              .filter(audit => audit.group === 'diagnostics' && !this.showAsPassed(audit))
              .sort((a, b) => {
                  const scoreA = a.scoreDisplayMode === 'informative' ? 100 : Number(a.score);
                  const scoreB = b.scoreDisplayMode === 'informative' ? 100 : Number(b.score);
                  return scoreA - scoreB;
              });
        return diagnosticAudits;
      },
       passedAudits() {
          const passedAudits = this.audits
                  .filter(audit => (audit.group === 'load-opportunities' || audit.group === 'diagnostics') &&
              this.showAsPassed(audit));
          return passedAudits;
      }
    },
    created(){
      this.fetchData();
    }
  }
</script>
