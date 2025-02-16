import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"




export default function Layout({ children, one, two }: { children: React.ReactNode, two: React.ReactNode, one: React.ReactNode }) {
  return (
    <div className="pt-10 px-10">
      <Tabs>
        <TabsList defaultValue="children">
          <TabsTrigger value="children">children</TabsTrigger>
          <TabsTrigger value="one">one</TabsTrigger>
          <TabsTrigger value="two">two</TabsTrigger>
        </TabsList>
        <TabsContent value="children">
          {children}
        </TabsContent>
        <TabsContent value="one">
          {one}
        </TabsContent>
        <TabsContent value="two">
          {two}
        </TabsContent>
      </Tabs>
    </div>
  )
}
