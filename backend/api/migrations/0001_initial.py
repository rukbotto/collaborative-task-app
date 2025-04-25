from django.db import migrations

class Migration(migrations.Migration):

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        # Makes the email field unique and sets its max length to 254 characters
        migrations.RunSQL(
            sql="ALTER TABLE auth_user ALTER COLUMN email TYPE VARCHAR(254); ALTER TABLE auth_user ADD CONSTRAINT unique_email UNIQUE (email);",
            reverse_sql="ALTER TABLE auth_user DROP CONSTRAINT unique_email;"
        ),
    ]