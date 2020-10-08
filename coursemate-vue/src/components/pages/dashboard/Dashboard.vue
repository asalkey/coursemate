<template>
    <div class="d-flex flex-row">
        <ul class="list-group mb-3">

                    <li class="list-group-item d-flex justify-content-between lh-condensed">
                      <div>
                        <h6 class="my-0">Piano 101 exam help</h6>
                        <small class="text-muted">10/20/20 - online</small>
                          <br>
                        Attending <span class="badge badge-info">5</span>
                      </div>
                        </li>
                </ul>

                <div class="mb-3">
                    <h3> Filter</h3>
                    <span>Location:
                        <SelectButton v-model="filterData.location" :options="justifyOptions" dataKey="value">
                            <template #option="slotProps">
                                <i :class="slotProps.option.icon">d</i>
                            </template>
                        </SelectButton>

                    </span>
                    <br>
                    <br>
                    <span>Date: <Calendar v-model="filterData.date" /> </span>
                    <br>
                    <br>
                    <span>Time: <Calendar v-model="filterData.time" :timeOnly="true" hourFormat="12" /> </span>
                    <br>
                    <br>
                    <ul>
                        <li> All classes </li>
                        <li> (x) Piano 101 </li>
                    </ul>
                    <button> + add a class </button>
                </div>
    </div>
</template>

<script>
import Calendar from 'primevue/calendar';
import SelectButton from 'primevue/selectbutton';

export default {
    components:{Calendar,SelectButton},
    data:function(){
        return {
            justifyOptions: [
                {icon: 'pi pi-align-left', value: 'left'},
                {icon: 'pi pi-align-right', value: 'Right'},
                {icon: 'pi pi-align-center', value: 'Center'},
                {icon: 'pi pi-align-justify', value: 'Justify'}]
            ,
            filterData:{
                location:null,
                date:'',
                time:'',
            }
        }
    }
}
</script>

