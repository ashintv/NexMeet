import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@radix-ui/react-label"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { useCreateForm } from "@/store/useCreateForm"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { BACKEND_URL } from "@/config"



const FormSchema = z.object({
	Name: z.string().min(1, ""),
	public: z.enum(["yes", "no"]), //pct == participant
	password: z.string().min(1).optional(), // ask hk
	pctSub: z.boolean(),
	pctPub: z.boolean(),
})

export function CreateMeetingForm() {
	const navigate = useNavigate()
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues:{
			"Name":"",
			"public":'yes',
			"pctPub":true,
			"pctSub":true,
			
	
			
		}
	})

	
	async function onSubmit(values: z.infer<typeof FormSchema>) {
		console.log(values)
		try{
			const response = await axios.post(BACKEND_URL+'/rooms',{
				Name:values.Name,
				pctPub:values.pctPub,
				pctSub:values.pctSub,
				roomJoin:true


			},{
				headers:{
					authorization:localStorage.getItem('token')
				}
			})
			console.log(response.data)
			navigate(`/room/host/${response.data.joinid}`)
		}catch(e:any){
			console.error(e)
		}
		
	}
	const isPublic = form.watch("public")
	const { setVisible } = useCreateForm()

	return (
		<div className="w-full font-serif  ">
			    <div className="flex justify-end">
                                 <Button onClick={()=>{
					setVisible(false)
				 }} variant={"outline"} className="hover:bg-primary">x</Button>
                               </div>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
					<FormField
						control={form.control}
						name="Name"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Meeting name</FormLabel>
								<FormControl>
									<Input placeholder="Board Meeting" {...field}></Input>
								</FormControl>
								<FormDescription>
									This is your Meeting display name.
								</FormDescription>
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="public"
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<RadioGroup
										onValueChange={field.onChange}
										defaultValue={field.value}
										className="flex">
											
										<Label  htmlFor="option-one" className="flex-col items-center w-1/2 rounded-md border border-primary p-5 space-x-2 ">
											<RadioGroupItem value="yes" id="option-one" />
											Public
											<FormDescription>Any one with join id can join your meeting </FormDescription>
										</Label>
										<Label  htmlFor="option-two" className="flex-col items-center w-1/2 rounded-md border border-primary p-5  space-x-2">
											<RadioGroupItem value="no" id="option-two" />
											Private
											<FormDescription>Password protected</FormDescription>
										</Label>
									</RadioGroup>
								</FormControl>
								
							</FormItem>
						)}
					/>
					{isPublic == "no" ? (
						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Password</FormLabel>
									<FormControl>
										<Input placeholder="Absr123" {...field}></Input>
									</FormControl>
									<FormDescription>
										Enter your meeting password for users to join
									</FormDescription>
								</FormItem>
							)}
						/>
					) : null}

					<Separator className="bg-primary" />
					<h1 className="font-serif">Select Meeting Settings</h1>
					<div>
						<FormField
							control={form.control}
							name="pctSub"
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Label className="hover:bg-primary/10 flex items-start gap-3 rounded-lg border border-primary p-3 has-[[aria-checked=true]]:border-blue-600 dark:has-[[aria-checked=true]]:border-blue-900 dark:has-[[aria-checked=true]]:bg-transparent">
											<Checkbox
												id="toggle-1"
												checked={field.value}
												onCheckedChange={field.onChange}
												className="data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checke"
											/>
											<div className="grid gap-1.5 font-normal">
												<p className="text-sm leading-none font-medium">
													Allow Participants to Share video and audio
												</p>
												<p className="text-muted-foreground text-sm">
													You can enable or disable at any
													time during the meeting
												</p>
											</div>
										</Label>
									</FormControl>
                                                                        
									<FormDescription></FormDescription>
								</FormItem>
							)}

						/>
                                                <FormField
							control={form.control}
							name="pctPub"
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Label className="hover:bg-primary/10 flex items-start gap-3 rounded-lg border p-3 has-[[aria-checked=true]]:border-blue-600 border-primary dark:has-[[aria-checked=true]]:border-blue-900 dark:has-[[aria-checked=true]]:bg-transparent">
											<Checkbox
												id="toggle-2"
												checked={field.value}
												onCheckedChange={field.onChange}
												className="data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checke"
											/>
											<div className="grid gap-1.5 font-normal">
												<p className="text-sm leading-none font-medium">
													Allow Participants to Share screen
												</p>
												<p className="text-muted-foreground text-sm">
													You can enable or disable at any
													time during the meeting
												</p>
											</div>
										</Label>

									</FormControl>
                                                                        
									<FormDescription></FormDescription>
								</FormItem>
							)}
						/>
                                                
					</div>
					<div className="flex justify-end">
						 <Button type="submit" >Create and Join</Button>
					</div>
				</form>
			</Form>
		</div>
	)
}
