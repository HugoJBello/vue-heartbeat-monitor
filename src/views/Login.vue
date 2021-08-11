<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card">
          <div class="card-header">Login</div>
          <div class="card-body">
            <div v-if="error" class="alert alert-danger">{{ error }}</div>
            <div action="#">
              <div class="form-group row">
                <div class="col-md-6">
                  <v-text-field
                      label="email"
                      id="email"
                      type="email"
                      required
                      autofocus
                      v-model="form.email"
                  ></v-text-field>
                </div>
              </div>

              <div class="form-group row">
                <div class="col-md-6">
                  <v-text-field
                      label="password"
                      id="password"
                      type="password"
                      required
                      v-model="form.password"
                  ></v-text-field>
                </div>
              </div>

              <div class="form-group row mb-0">
                <div class="col-md-8 offset-md-4">
                  <v-btn
                      text
                      color="teal accent-4"
                      v-on:click="login()"
                  >
                    {{ $t('Login') }}
                  </v-btn>

                  <v-btn
                      text
                      small
                      color="teal accent-4"
                      v-on:click="register()"
                  >
                    {{ $t('Register') }}
                  </v-btn>

                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import {auth} from "@/firebase";

@Component({})
export default class Login extends Vue {
  public form: any = {
    email: "",
    password: ""
  }

  public error: any | null = null

  public async login() {
    try {
      const data = await auth.signInWithEmailAndPassword(this.form.email, this.form.password)
      console.log(data.user)
      await this.$store.dispatch('setUser', data.user)
      this.$router.replace({name: "Home"});
    } catch (e) {
      this.error = e.message;
    }
  }

  public async register(){
    await this.$router.push({name: 'Register'})
  }
}
</script>

<style>
.container{margin:0 auto}
</style>
