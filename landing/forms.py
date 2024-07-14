from django import forms


class ContactForm(forms.Form):
    name = forms.CharField(max_length=100, required=True, widget=forms.TextInput(attrs={
        'class': 'form-control',
        'placeholder': 'Full Name',
        'style': 'background-color: rgba(250,250,250,0.3);'
    }))
    email = forms.EmailField(required=True, widget=forms.EmailInput(attrs={
        'class': 'form-control',
        'placeholder': 'E-mail Address',
        'style': 'background-color: rgba(250,250,250,0.3);'
    }))
    message = forms.CharField(max_length=500, required=True, widget=forms.Textarea(attrs={
        'class': 'form-control',
        'placeholder': 'Your Message',
        'rows': 6,
        'style': 'background-color: rgba(250,250,250,0.3);'
    }))
