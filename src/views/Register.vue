<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card">
          <div class="card-header">Register</div>
          <div class="card-body">
            <div v-if="error" class="alert alert-danger">{{ error }}</div>
            <div action="#">
              <div class="form-group row">
                <div class="col-md-6">
                  <v-text-field
                      :label="$t('nickname')"
                      id="name"
                      type="name"
                      required
                      autofocus
                      v-model="form.name"
                  ></v-text-field>
                </div>
              </div>

              <div class="form-group row">
                <div class="col-md-6">
                  <v-text-field
                      :label="$t('email or username')"
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
                      :label="$t('password')"
                      id="password"
                      type="password"
                      required
                      autofocus
                      v-model="form.password"
                  ></v-text-field>
                </div>
              </div>

              <div class="form-group row mb-0">
                <div class="col-md-8 offset-md-4">
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
export default class Register extends Vue {
  public form: any = {
    name: "",
    email: "",
    password: ""
  }

  public error: any | null = null

  public register() {
    let email = this.form.email
    if (!email.includes("@")) {
      email = email + "@quizlearn.com"
    }

    auth.createUserWithEmailAndPassword(email, this.form.password)
        .then(data => {
          (data.user as any)
              .updateProfile({
                displayName: this.form.name
              })
        }).then(() => {
      this.$router.push({name: 'Home'}) })
        .catch(err => {
          this.error = err.message;
        });
  }
}
</script>
