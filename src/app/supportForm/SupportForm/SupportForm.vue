<template>
  <form :class="$style.supportForm" @submit.prevent="onSubmit">

    <div>
      <h1>Support Requests</h1>
      <p>
        Let us know how we can best improve your experience developing with the Dexcom API.
        This form should not be used for product or technical issues related to Dexcom devices. For product or technical issues related to Dexcom devices, please call 1-844-607-8398; you may also email techsupport@dexcom.com, but your email will not be secure and could be intercepted in transit to Dexcom.
      </p>
    </div>
    <br>

    <vue-grid-row>
      <vue-grid-item>
        <strong>Choose a category</strong>
        <vue-select
          name="country"
          id="country"
          v-model="form.category"
          :options="categoryOptions"
          validation="required"
          required/>
      </vue-grid-item>
    </vue-grid-row>

    <vue-grid-row>
      <vue-grid-item>
        <strong>Subject</strong>
        <vue-input
          name="subject"
          id="subject"
          v-model="form.subject"
          validation="required"
          required/>
      </vue-grid-item>
    </vue-grid-row>

    <vue-grid-row>
      <vue-grid-item>
        <strong>Description</strong>
        <vue-input
          area
          name="description"
          id="description"
          v-model="form.description"
          validation="required"
          required/>
      </vue-grid-item>
    </vue-grid-row>

    <p>Tell us a little about yourself to help us help you!</p>
    <br>

    <vue-grid-row>
      <vue-grid-item>
        <strong>What is your level of knowledge with diabetes?</strong>
        <vue-select
          name="country"
          id="country"
          v-model="form.diabetesKnowledge"
          :options="knowledgeLevels"
          validation="required"
          required/>
      </vue-grid-item>
    </vue-grid-row>

    <vue-grid-row>
      <vue-grid-item>
        <strong>What is your level of knowledge with APIs?</strong>
        <vue-select
          name="country"
          id="country"
          v-model="form.apiKnowledge"
          :options="knowledgeLevels"
          validation="required"
          required/>
      </vue-grid-item>
    </vue-grid-row>
    <br>

    <vue-grid-item>
      <vue-button :loading="isLoading" primary>Submit</vue-button>
    </vue-grid-item>
    <br>

    <vue-grid-row>
      <vue-grid-item :class="$style.appInfo">
        <strong>Application Info:</strong>
        <p>Product Name: {{ appInfo["Product Name"] }}</p>
        <p>Version: {{ appInfo["UDI / Production Identifier"]["Version"] }}</p>
        <p>Git SHA: {{ appInfo["Sub-Components"][0]["gitSHA"] }}</p>
      </vue-grid-item>
    </vue-grid-row>
    <br>

  </form>
</template>

<script lang="ts">
  import { mapActions, mapGetters } from 'vuex';
  import { IPreLoad }               from '../../../server/isomorphic';
  import VueInput                   from '../../shared/components/VueInput/VueInput.vue';
  import VueSelect                  from '../../shared/components/VueSelect/VueSelect.vue';
  import VueGrid                    from '../../shared/components/VueGrid/VueGrid.vue';
  import VueGridItem                from '../../shared/components/VueGridItem/VueGridItem.vue';
  import VueButton                  from '../../shared/components/VueButton/VueButton.vue';
  import VueGridRow                 from '../../shared/components/VueGridRow/VueGridRow.vue';
  import { addNotification, INotification } from '../../shared/components/VueNotificationStack/utils';
  import { HttpService }            from '../../shared/services/HttpService';
  import { AxiosResponse }          from 'axios';
  import { ISupportFormTextResponse } from '../actions';

  export default {
    metaInfo: { title: 'SupportForm' },
    components: {
      VueGrid,
      VueGridItem,
      VueButton,
      VueGridRow,
      VueInput,
      VueSelect,
    },
    data(): any {
      return {
        POST_URL: 'https://azurn-test.free.beeceptor.com',
        isLoading: false,
        categoryOptions: [
          { label: 'Account Management', value: 'account-management' },
          { label: 'App Management', value: 'app-management' },
          { label: 'API Endpoints', value: 'api-endpoints' },
          { label: 'Delete Account', value: 'delete-account' },
          { label: 'Feedback', value: 'feedback' },
          { label: 'Feature Request', value: 'feature-request' },
          { label: 'Upgrading to Full Access', value: 'upgrade-access' },
          { label: 'Other', value: 'other' },
        ],
        knowledgeLevels: [
          { label: 'None', value: 'none' },
          { label: 'Low', value: 'low' },
          { label: 'Medium', value: 'medium' },
          { label: 'High', value: 'high' },
        ],
        form: {
          category: '',
          subject: '',
          description: '',
          diabetesKnowledge: '',
          apiKnowledge: '',
        },
      };
    },
    methods:    {
      ...mapActions('supportForm', [
        'increment',
        'decrement',
      ]),
      onSubmit() {
        this.isLoading = true;
        console.log(JSON.parse(JSON.stringify(this.form)));
        return HttpService.post(this.POST_URL, {...this.form})
          .then((res: AxiosResponse<ISupportFormTextResponse>) => {
            setTimeout(() => {
              console.log(`Response from POST ${this.POST_URL} - status: ${res.status} - body: ${JSON.stringify(res.data)}.`);
              if (res.status !== 200) {
                addNotification(
                  {
                    title: 'Unexpected error - we could not receive your support errors.',
                    text:  'Please try again soon!',
                  } as INotification,
                );
              } else {
                addNotification(
                  {
                    title: 'Support request sent!',
                    text:  'We appeciate your feedback, and will get back to you soon!',
                  } as INotification,
                );
              }
            }, 500);
          })
          .then(() => {
            setTimeout(() => {
              this.isLoading = false;
              location.reload();
            }, 5000);
          });
      },
    },
    computed:   {
      ...mapGetters('supportForm', ['appInfo', 'count', 'incrementPending', 'decrementPending']),
    },
    prefetch:   (options: IPreLoad) => {
      return options.store.dispatch('supportForm/increment')
        .then(() => options.store.dispatch('supportForm/getInfo'));
    },
  };
</script>

<style lang="scss" module>
  @import "../../shared/styles";

  .supportForm {
    width: 65%;
    margin: 0 auto;
    margin-top: $nav-bar-height;
    min-height: 500px;
    display: block;
  }
  .appInfo {
    font-size: 11px;
  }
</style>