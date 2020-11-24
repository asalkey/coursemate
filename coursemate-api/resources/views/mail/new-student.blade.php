@component('mail::message')
# Welcome to {{ config('app.name') }}

Hello {{$name}},

Get started by adding courses to your list

@component('mail::button', ['url' => ''])
Add a course
@endcomponent

You can then add and/or join study groups by clicking on the courses in your course list.

@endcomponent
