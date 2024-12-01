<template>
  <v-container class="text-start">
  <v-btn><router-link to="/user" class="text-decoration-none">
      <v-icon left> mdi-arrow-left </v-icon>
      Voltar</router-link>
    </v-btn>
  <v-card class="mx-auto mt-16" max-width="800">
    <v-img
      class="white--text align-end"
      width="100%"
      :src="user.picture"
    >
      <v-card-title class="text-h5">
        {{ user.title }} {{ user.fullName }}
      </v-card-title>
    </v-img>

    <v-card-subtitle class="pb-4">
      <strong>Email:</strong> {{ user.email }}
    </v-card-subtitle>

    <v-card-text>
      <v-divider></v-divider>

      <div class="mt-2">
        <strong>Telefone:</strong> {{ user.phone }}
      </div>

      <div class="mt-2">
        <strong>Data de Nascimento:</strong> {{ new Date(user.dateOfBirth).toLocaleDateString() }}
      </div>

      <v-divider class="my-4"></v-divider>

      <div>
        <strong>Endereço:</strong>
        {{ user.location.street }}, {{ user.location.city }}, {{ user.location.state }}
        - {{ user.location.country }}
      </div>
      <div>
        <strong>Fuso Horário:</strong> {{ user.location.timezone }}
      </div>

      <v-divider class="my-4"></v-divider>

      <div>
        <strong>Registrado em:</strong>
        {{ new Date(user.registerDate).toLocaleDateString() }}
      </div>
      <div>
        <strong>Última atualização:</strong>
        {{ new Date(user.updatedDate).toLocaleDateString() }}
      </div>
    </v-card-text>
  </v-card>
</v-container>
</template>


<script>
import { getUserDetail } from "@/services/api";

export default {
  name: "UserDetail",
  props: ["id"],
  data() {
    return {
      user: null,
    };
  },
  async created() {
    try {
      const response = await getUserDetail(this.id);
      const userData = response.data;

      this.user = {
        id: userData.id,
        title: userData.title,
        firstName: userData.firstName,
        lastName: userData.lastName,
        fullName: `${userData.firstName} ${userData.lastName}`,
        picture: userData.picture,
        gender: userData.gender,
        email: userData.email,
        dateOfBirth: userData.dateOfBirth,
        phone: userData.phone,
        location: {
          street: userData.location.street,
          city: userData.location.city,
          state: userData.location.state,
          country: userData.location.country,
          timezone: userData.location.timezone,
        },
        registerDate: userData.registerDate,
        updatedDate: userData.updatedDate,
      };
    } catch (error) {
      console.error("Erro ao buscar detalhes do usuário:", error);
    }
  },
};
</script>
