<tr>
<td class="header">
<a href="{{ $url }}" style="display: inline-block;">
@if (trim($slot) === 'Laravel')
<h1 style="color: #1d1d1d;text-transform: lowercase;letter-spacing: -1px;font-weight: bold;font-family: 'Source Sans Pro', sans-serif !important;"> coursemate </h1>
@else
{{ $slot }}
@endif
</a>
</td>
</tr>
