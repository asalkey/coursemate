@component('mail::message')
# Welcome to {{ config('app.name') }}

Hello {{$name}},

Get started by going to your dashboard and adding courses to your course list.

@component('mail::button', ['url' => 'https://coursemate.study/dashboard'])
 Dashboard
@endcomponent

You can then add and/or join study groups by clicking on the courses in your course list.

@endcomponent
