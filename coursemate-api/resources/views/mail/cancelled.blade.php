@component('mail::message')
# Study group cancelled

Hello {{name}},

The following study group has been canceled:

@component('mail::button', ['url' => ''])
Create a new study group
@endcomponent

@component('mail::button', ['url' => ''])
Join a new study group
@endcomponent


@endcomponent
