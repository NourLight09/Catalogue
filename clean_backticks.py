import os
import re

files = ['accordion.jsx', 'alert-dialog.jsx', 'badge.jsx', 'button.jsx', 'card.jsx', 'checkbox.jsx', 'dialog.jsx', 'dropdown-menu.jsx', 'input.jsx', 'label.jsx', 'select.jsx', 'sheet.jsx', 'slider.jsx', 'table.jsx', 'textarea.jsx']
dir_path = r'c:\Users\Nourath\Desktop\Projects\Catalogue-Glow\resources\js\components\ui'

for file in files:
    filepath = os.path.join(dir_path, file)
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Remove the opening backticks with jsx
    content = re.sub(r'^```jsx\s*\n', '', content)
    # Remove the closing backticks
    content = re.sub(r'\n```\s*$', '', content)
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f'✓ Nettoyé: {file}')
