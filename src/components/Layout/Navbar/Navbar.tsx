import Button from "@/components/Interactibles/Button/Button";
import TextInput from "@/components/Interactibles/Inputs/TextInput";

// TODO: CREATE A FLEX COMPONENT!!!
export default function Navbar() {
    return(
        <nav className="flex align-items-center justify-content-space-between gap-3">
            <h1>OurTube</h1>
            <TextInput 
                input={{
                    label: 'Search videos & shorts',
                    name: 'search_query',
                    placeholder: 'Search videos & shorts',
                    validators: [],
                    inputType: 'text',
                    onInput: () => null
                }} showLabel={false} 
            />
            <ul className="flex align-items-center gap-1">
                <li>
                    <Button button={{
                        variant: 'secondary',
                        attachments: [],
                        onClick: () => null,
                    }}>
                        Sign up
                    </Button>
                </li>
                <li>
                    <Button button={{
                        variant: 'secondary',
                        attachments: [],
                        onClick: () => null,
                    }}>
                        Log in
                    </Button>
                </li>
            </ul>
        </nav>
    )
}