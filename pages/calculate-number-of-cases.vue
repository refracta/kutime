<template>
  <v-layout wrap>
    <v-flex xs12 md10>
      <v-container
        fluid
        grid-list-md
        class="pa-0"
      >
        <v-layout wrap>
          <v-flex xs12 sm6 lg4 xl3>
            <v-card>
              <v-card-actions>
                <v-layout wrap>
                  <v-flex xs9 lg12>
                    <div class="subheading text-truncate">(과목명)</div>
                  </v-flex>
                  <v-flex>
                    <v-layout>
                      <v-spacer></v-spacer>
                      <v-btn icon small>
                        <v-icon small>fas fa-lock</v-icon>
                      </v-btn>
                      <v-btn icon small>
                        <v-icon small>fas fa-eye-slash</v-icon>
                      </v-btn>
                    </v-layout>
                  </v-flex>
                </v-layout>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-flex>
    <v-flex xs12 md1 offset-md1>
      <v-btn
        block
        color="info"
      >계산</v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: 'calculate-number-of-cases-page',
  layout: 'calculate-number-of-cases',
  head () {
    return {
      title: '경우의 수 계산'
    }
  }
}
</script>
