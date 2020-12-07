@component('mail::message')

Hello {{$name}},

You joined a study group. Keep note of the information below:

**Description:** {{$data['description']}}

**Time:** {{$data['time']}}

@if($data['remote'])

**Link:** {{$data['link']}}

@else

**Address:** {{$data['address']}}

@endif

@if($data['notes'])

**Notes:** {{$data['notes']}}

@endif

@endcomponent

