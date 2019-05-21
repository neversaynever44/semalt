<template>
  <v-flex xs12 row>
<v-layout py-3>

 
<!-- <v-flex xs12 sm10 offset-sm1> -->
        <v-flex xs12 sm12>

          <v-card>
            <v-card-title>
              <div class="title">Opportunities</div>
              <v-spacer></v-spacer>
              <v-text-field
                v-model="tables.search_Opportunities"
                append-icon="search"
                label="Search"
                single-line
                hide-details
              ></v-text-field>
            </v-card-title>
            <v-data-table
              :headers="headers"
              :loading="tables.load_Opportunities"
              :items="opportunityAudits"
              :search="tables.search_Opportunities"
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
                  <td>{{ props.index+1 }}</td>
                <td>{{ props.item.title }}</td>
                <td class="text-xs-left">{{ props.item.id }}</td>
                <td class="text-xs-left">{{ props.item.description }}</td>
                <td class="text-xs-left">{{ props.item.group }}</td>
                <td class="text-xs-left">
                  {{ props.item.score }}
              </td>
                <td class="text-xs-left">{{ props.item.scoreDisplayMode }}</td>
              </template>
            </v-data-table>
        </v-card>
        </v-flex>
     </v-layout>
  <v-layout py-3>
    
      <v-flex xs12 sm12>

          <v-card>
            <v-card-title>
              <div class="title">Diagnostics</div>
              <v-spacer></v-spacer>
              <v-text-field
                v-model="tables.search_Diagn"
                append-icon="search"
                label="Search"
                single-line
                hide-details
              ></v-text-field>
            </v-card-title>
            <v-data-table
              :headers="headers"
              :loading="tables.load_Diagn"
              :items="diagnosticAudits"
              :search="tables.search_Diagn"
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

                  <td>{{ props.index+1 }}</td>
                <td>{{ props.item.title }}</td>
                <td class="text-xs-left">{{ props.item.id }}</td>
                <td class="text-xs-left">{{ props.item.description }}</td>
                <td class="text-xs-left">{{ props.item.group }}</td>
                <td class="text-xs-left">
                  {{ props.item.score }}
              </td>
                <td class="text-xs-left">{{ props.item.scoreDisplayMode }}</td>
              </template>
            </v-data-table>
        </v-card>
        </v-flex>



  </v-layout>

  


<v-layout py-3>
    
<v-flex xs12 sm12>

          <v-card>
            <v-card-title>
              <div class="title">Successfull Audits</div>
              <v-spacer></v-spacer>
              <v-text-field
                v-model="tables.search_Audit"
                append-icon="search"
                label="Search"
                single-line
                hide-details
              ></v-text-field>
            </v-card-title>
            <v-data-table
              :headers="headers"
              :loading="tables.load_Audit"
              :items="passedAudits"
              :search="tables.search_Audit"
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
                  <td>{{ props.index+1 }}</td>
                <td>{{ props.item.title }}</td>
                <td class="text-xs-left">{{ props.item.id }}</td>
                <td class="text-xs-left">{{ props.item.description }}</td>
                <td class="text-xs-left">{{ props.item.group }}</td>
                <td class="text-xs-left">
                  {{ props.item.score }}
              </td>
                <td class="text-xs-left">{{ props.item.scoreDisplayMode }}</td>
              </template>
            </v-data-table>
        </v-card>
        </v-flex>


    
  </v-layout>

      <Preloader
      :value="preloader.state"
      :message="preloader.message"
      :progressColor="preloader.color"
      ></Preloader>
  </v-flex>
</template>

<script>
  import axios from "axios";

  import Preloader from "../Elements/preloader.vue";


  export default {
    name: 'Dashboard',
    components: {Preloader},
    data () {
      return {
        tables: {
          load_Opportunities: true,
          search_Opportunities: '',
          load_Diagn: true,
          search_Diagn: '',
          load_Audit: true,
          search_Audit: ''
        },
        audits: [],
        search: '',
        PASS_THRESHOLD: 0.9,
        RATINGS: {
          PASS: {label: 'pass', minScore: this.PASS_THRESHOLD},
          AVERAGE: {label: 'average', minScore: 0.5},
          FAIL: {label: 'fail'},
          ERROR: {label: 'error'},
        },
        preloader: {
          state: true,
          message: 'fetching data',
          color: 'gray'
        },
        headers: [
          { text: 'Index', value: 'index' },
          {
            text: 'Title',
            align: 'left',
            sortable: false,
            value: 'title'
          },
          { text: 'Id', value: 'id' },
          { text: 'Description', value: 'description' },
          { text: 'Group', value: 'group' },
          { text: 'Score', value: 'score' },
          { text: 'scoreDisplayMode', value: 'scoreDisplayMode' }
        ],
       
      }
    },
    methods: {
        onSuccess() {
            this.tables.load_Opportunities = false
            this.tables.load_Diagn = false
            this.tables.load_Audit = false
        },
       onError() {
            this.tables.load_Opportunities = true
            this.tables.load_Diagn = true
            this.tables.load_Audit = true
        },
       _getWastedMs(audit) {
                if(audit.group === "load-opportunities") {
                    return audit.details.overallSavingsMs;
                } else {
                    return this.RATINGS.AVERAGE.minScore;
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
              this.preloader.state = true;
              this.onError();
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
            vm.preloader.state = false;
            vm.onSuccess();
           }).catch(function(error) {
              vm.preloader.state = true;
              vm.preloader.message = error;
              console.log(error)
              vm.onError();
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
